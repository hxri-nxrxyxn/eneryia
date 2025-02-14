import { App } from '@capacitor/app';
import { navigate } from "svelte-routing";

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

export { handleBackButton };  