<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import NavBot from "./NavBot.svelte";
    import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
    import { checkUser, runAI } from "../script";
    checkUser();
    async function takePhoto() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                source: CameraSource.Camera, // Use "CameraSource.Photos" for gallery
                resultType: CameraResultType.Base64, // "Uri" returns the image URL
            });

            await runAI(image.base64String);
        } catch (error) {
            alert(error);
        }
    }
</script>

<NavBot />
<main>
    <div class="contents">
        <h1>
            <span>Add to</span>
            <br />
            Inventory
        </h1>
        hey
        <button onclick={takePhoto}>LAUNCH CAMERA</button>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
</style>
