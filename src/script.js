import { App } from "@capacitor/app";
import { navigate } from "svelte-routing";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Storage } from "@capacitor/storage";

const baseUrl = "https://api.laddu.cc/api/v1";

async function setToken(token) {
  await Storage.set({
    key: "token",
    value: token,
  })
}


const checkPermission = async () => {
  const status = await BarcodeScanner.checkPermission({ force: true });

  if (status.granted) {
    return true;
  }

  if (status.denied) {
    console.log("Permission denied");
    return false;
  }

  return false;
};

const startScanning = async () => {

  BarcodeScanner.hideBackground();
  document.body.style.background = "transparent";
  const result = await BarcodeScanner.startScan();
  document.body.style.background = "black";


  if (result.hasContent) {
    alert(`Scanned content: ${result.content}`);
  } else {
    console.log("No content scanned");
  }
};


function handleBackButton(fallbackUrl) {
  sessionStorage.setItem("fallbackPage", fallbackUrl);

  App.addListener("backButton", () => {
    const prevPage = sessionStorage.getItem("fallbackPage");

    if (prevPage) {
      navigate(prevPage, { replace: true });
    } else {
      App.exitApp();
    }
  });
}

const stopScanning = async () => {
  await BarcodeScanner.showBackground();
  await BarcodeScanner.stopScan();
  document.body.style.background = "black";
  handleBackButton("/")
};

async function signup(data) {
  try {
    console.log(data)
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (!response.ok) {
      alert(res.message);
      return;
    }
    await setToken(res.token);
    navigate("/collect", { replace: true });
  } catch (error) {
    console.log(error);
  }
}

async function checkUser() {
  const {value} = await Storage.get({ key : "token"});
  console.log(value)
  if (!value) {
    navigate("/signup", { replace: true });
    return;
  }
  const response = await fetch(`${baseUrl}/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${value}`,
    },
  });
  const res = await response.json();
  if (!response.ok) {
    alert(res.message);
    navigate("/signup", { replace: true });
    return;
  }
  const id = res.id;
  const response2 = await fetch(`${baseUrl}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res2 = await response2.json();
  if (!response2.ok) {
    alert(res2.message);
    return;
  }
  return res2.data;
}

async function logout() {
  try {
    await Storage.remove({ key: "token" });
    location.href = "/login";
} catch (error) {
    console.error("Error:", error);
}
}

export { handleBackButton, signup, checkPermission, startScanning, stopScanning, checkUser, logout };
