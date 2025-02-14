<script>
  import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
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

<main>
  <button onclick={takePhoto}>click me</button>
  <button onclick={startScanning}>Bar Code</button>
</main>

<style></style>
