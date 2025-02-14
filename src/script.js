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
    alert(res.token);
    navigate("/collect", { replace: true });
  } catch (error) {
    console.log(error);
  }
}



export { handleBackButton, signup, checkPermission, startScanning, stopScanning };
