<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import NavBot from "./NavBot.svelte";
    import { App } from "@capacitor/app";
    import { startScanning, stopScanning, checkUser } from "../script";

    App.addListener("backButton", () => {
        stopScanning();
    });

    checkUser();
</script>

<NavBot />
<main>
    <div class="contents">
        <h1>
            <span>Add to</span>
            <br />
            Inventory
        </h1>
        <div class="box"></div>
        <button onclick={startScanning}>SCAN</button>
    </div>
</main>

<style>
    .box {
        width: calc(100vw - 4rem);
        height: calc(100vw - 4rem);
        background: #111;
        border-radius: 10px;
    }
    h3 {
        margin-bottom: 1rem;
    }
</style>
