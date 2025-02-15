<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import NavBot from "./NavBot.svelte";

    let name;
    let life;
    let quantity;
</script>

<NavBot />
<main>
    <div class="contents">
        <h1>
            <span>Add to</span>
            <br />
            Inventory
        </h1>
        <div class="form">
            <div class="form__line">
                <label>name</label>
                <input type="text" placeholder="Horlicks" bind:value={name} />
            </div>
            <div class="form__line">
                <label>shelf life</label>
                <input type="text" placeholder="2W" bind:value={life} />
            </div>
            <div class="form__line">
                <label>Quantity</label>
                <input type="text" placeholder="3" bind:value={quantity} />
            </div>
            <button>ADD</button>
        </div>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
</style>
