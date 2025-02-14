import { App } from '@capacitor/app';
import { navigate } from "svelte-routing";

const baseUrl = "https://api.laddu.cc:8080";

function handleBackButton(fallbackUrl) {
    sessionStorage.setItem("fallbackPage", fallbackUrl);

    App.addListener('backButton', () => {
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
        navigate("/dashboard", { replace: true });

    } catch (error) {
        alert(`Error creating data:${error}`);
    }
}

export { handleBackButton , signup};  