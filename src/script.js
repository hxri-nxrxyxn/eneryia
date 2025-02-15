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
    const code = result.content;
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if(!res.product.product_name) {
      alert("Product not found");
      return;
    }

    alert(res.product.product_name);
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
    navigate("/login", { replace: true });
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
    navigate("/login", { replace: true });
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

async function login(data) {
  try {
    console.log(data)
    const response = await fetch(`${baseUrl}/login`, {
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
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);
  }
}

async function collect(data) {
try{

  const user = await checkUser();
  if (!user) {
    return;
  }

  const id = user.id;

  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  if (!response.ok) {
    alert(res.message);
    return;
  }
  res.data.name = data.name
  res.data.intake = Number(data.intake)
  res.data.preference = data.preference
  res.data.mpd = Number(data.mpd)

  console.log(res.data)

  const response2 = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res.data),
  });
  const res2 = await response2.json();
  if (!response2.ok) {
    alert(res2.message);
    return;
  }
  console.log(res2)
  navigate("/dashboard", { replace: true });
}
catch(error) {
  console.log(error);
}
}

async function getRecipies(recid) {
  const recipies = recid.map(rec => {
    return fetch(`${baseUrl}/recipe/${rec}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  })
  const res = await Promise.all(recipies);
  const data = await Promise.all(res.map(r => r.json()));
  console.log(data);
}

async function getIngredients(ingid) {
  const ingredients = ingid.map(ing => {
    return fetch(`${baseUrl}/ingredient/${ing}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  })
  const res = await Promise.all(ingredients);
  const data = await Promise.all(res.map(r => r.json()));
  const redata = data.map(d => d.data);
  return redata;
}
export { handleBackButton, signup, checkPermission, startScanning, stopScanning, checkUser, logout, login, collect, getRecipies, getIngredients };
