<script>
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
</script>

<main>
    <Nav />
    <h1>
        <span>Introducing</span>
        Savr
    </h1>
    hey there
    <Link to="/scan">
        <button>Scan page</button>
    </Link>
</main>

<style>
</style>
