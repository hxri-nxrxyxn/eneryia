<script>
  import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

  let photoUrl = "";

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
  <button onclick={takePhoto}>lick me</button>
</main>

<style></style>
