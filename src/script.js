import { App } from "@capacitor/app";
import { navigate } from "svelte-routing";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Storage } from "@capacitor/storage";

const genAI = new GoogleGenerativeAI("AIzaSyBYvUGHs_md8FwJYkgHJOjF7wALmhOcAmY");
const baseUrl = "https://api.laddu.cc/api/v1";

async function setToken(token) {
  await Storage.set({
    key: "token",
    value: token,
  });
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
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await response.json();
    if (!res.product) {
      alert("Product not found");
      return;
    }

    const name = res.product.product_name;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        response_mime_type: "application/json",
      },
    });
    const prompt = `${name} for this product send only a json containing {name,calorie,quantity,expiry} if expiry is not sure make an estimate expiry is in days, the product quantity being then number of the products`;
    const result2 = await model.generateContent(prompt);
    const output = result2.response.text();
    const out = JSON.parse(output);
    console.log(out);
    if (!out.products) {
      const response = await fetch(`${baseUrl}/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: out.name,
          calorie: Number(out.calorie),
          quantity: Number(out.quantity),
          expiry: out.expiry,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        console.log(res);
        return;
      }
      console.log(res);
      return;
    }
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
  handleBackButton("/");
};

async function signup(data) {
  try {
    console.log(data);
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
  const { value } = await Storage.get({ key: "token" });
  console.log(value);
  if (!value) {
    navigate("/login", { replace: true });
    return;
  }
  const response = await fetch(`${baseUrl}/verify`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${value}`,
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
    console.log(data);
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
  try {
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
    res.data.name = data.name;
    res.data.intake = Number(data.intake);
    res.data.preference = data.preference;
    res.data.mpd = Number(data.mpd);

    navigate("/scan", { replace: true });
    console.log(res.data);

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
    console.log(res2);
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);
  }
}

async function getRecipies(recid) {
  const recipies = recid.map((rec) => {
    return fetch(`${baseUrl}/recipe/${rec}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  const res = await Promise.all(recipies);
  const data = await Promise.all(res.map((r) => r.json()));
  const redata = data.map((d) => d.data);
  return redata;
}

async function getIngredients(ingid) {
  const ingredients = ingid.map((ing) => {
    return fetch(`${baseUrl}/ingredient/${ing}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  const res = await Promise.all(ingredients);
  const data = await Promise.all(res.map((r) => r.json()));
  const redata = data.map((d) => d.data);
  return redata;
}

async function runAI(base64) {
  try {
    const prompt =
      "if the image has any products in it send only a json containing {name,calorie,quantity,expiry} if expiry is not sure make an estimate expiry is in days, the product quantity being then number of the products visible";
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        response_mime_type: "application/json",
      },
    });

    console.log("t2");

    const imageParts = [
      {
        inlineData: {
          data: base64,
          mimeType: "image/jpeg",
        },
      },
    ];

    console.log("t3");

    const generatedContent = await model.generateContent([
      prompt,
      ...imageParts,
    ]);

    console.log("t4");

    const output = generatedContent.response.text();
    const out = JSON.parse(output);
    console.log(out);
    if (!out.products) {
      const response = await fetch(`${baseUrl}/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: out.name,
          calorie: Number(out.calorie),
          quantity: Number(out.quantity),
          expiry: out.expiry,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        console.log(res);
        return;
      }
      console.log(res);
      const userdata = await checkUser();
      const userid = userdata.id;
      const id = res.data.id;
      const response3 = await fetch(`${baseUrl}/ingredient/${userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingid: id,
        }),
      });

      const res3 = await response3.json();
      if (!response3.ok) {
        alert(res3.message);
        return;
      }
      console.log(res3);

      alert("Product added");
      return;
    }

    const arr = out.products;

    const data = arr.map(async (d) => {
      const response = await fetch(`${baseUrl}/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: d.name,
          calorie: d.calorie,
          quantity: d.quantity,
          expiry: d.expiry,
        }),
      });
      const res = await response.json();
      if (!response.ok) {
        alert(res.message);
      }
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
}

async function generteRecipe() {
  const userdata = await checkUser();
  const ingid = userdata.ingid;
  const ingarr = await getIngredients(ingid);
  const text = JSON.stringify(ingarr);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      response_mime_type: "application/json",
    },
  });
  const prompt = `${text} these are the ingredients which are nearing expiry genrate me in json all the recipies that can be made with it in this format {name,instruction,cooking_time,happy,calories,ingid } where instruction is cooking instruction for recipe, happy is the satisfaction score for the recipe, ingid is the id of the ingredients used in the recipe`;
  console.log(prompt);
  const result2 = await model.generateContent(prompt);
  const output = result2.response.text();
  const out = JSON.parse(output);
  console.log(out);
  const arr = out.map(async (d) => {
    const response = await fetch(`${baseUrl}/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: d.name,
        instruction: d.instruction,
        cooking_time: Number(d.cooking_time),
        happy: d.happy,
        calories: d.calories,
        ingid: d.ingid,
      }),
    });
    const res = await response.json();
    if (!response.ok) {
      alert(res.message);
    }
    console.log(res);

    const userdata = await checkUser();
    const userid = userdata.id;
    const id = res.data.id;
    const response3 = await fetch(`${baseUrl}/recipe/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recid: id,
      }),
    });

    const res3 = await response3.json();
    if (!response3.ok) {
      alert(res3.message);
      return;
    }
    console.log(res3);

    alert("Product added");
    return;
  });
}

async function getRecipe(id) {
  console.log(id);
  const response = await fetch(`${baseUrl}/recipe/${id}`, {
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
  console.log(res.data);
  return res.data;
}

export {
  handleBackButton,
  signup,
  checkPermission,
  startScanning,
  stopScanning,
  checkUser,
  logout,
  login,
  collect,
  getRecipies,
  getIngredients,
  runAI,
  generteRecipe,
  getRecipe,
};
