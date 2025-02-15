<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import NavBot from "./NavBot.svelte";
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
        <button>SCAN</button>
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
