<script>
    import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
    import NavBot from "./NavBot.svelte";
    import { checkPermission, startScanning, stopScanning } from "../script";
    import { App } from "@capacitor/app";
    window.scrollTo({ top: 0, behavior: "smooth" });

    let photoUrl = "";

    App.addListener("backButton", () => {
        stopScanning();
    });

    checkPermission();

    async function takePhoto() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                source: CameraSource.Camera, // Use "CameraSource.Photos" for gallery
                resultType: CameraResultType.Base64, // "Uri" returns the image URL
            });

            alert(image.base64String);
        } catch (error) {
            alert(error);
        }
    }
</script>

<NavBot selection="Plus" />
<main>
    <div class="contents">
        <h1>
            <span>Add to</span>
            <br />
            Inventory
        </h1>
    </div>
    <h3>with Photo</h3>
    <button onclick={takePhoto}>click me</button>
    <h3>with Barcode</h3>
    <button onclick={startScanning}>Bar Code</button>
</main>

<style>
    h3 {
        margin-top: 1rem;
    }
</style>
