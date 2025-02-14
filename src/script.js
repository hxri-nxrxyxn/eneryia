import { App } from "@capacitor/app";
import { navigate } from "svelte-routing";

const baseUrl = "https://api.laddu.cc/api/v1";

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
      console.log(res);
      return;
    }
    navigate("/dashboard", { replace: true });
  } catch (error) {
    console.log(error);
  }
}

export { handleBackButton, signup };
