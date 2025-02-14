<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Your</span>
            <br />
            Inventory
        </h1>
    </div>
    <div class="buttons">
        <Link to="/dashboard">
            <button>Accept</button>
        </Link>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
</style>
