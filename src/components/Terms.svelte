<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Before you</span>
            <br />
            Proceed
        </h1>
        <h3>Terms and Conditions</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            quae adipisci enim omnis vitae hic nam sunt, non eius! Perferendis
            deserunt officia pariatur eaque esse magni nemo, temporibus quae
            dolorum?
        </p>
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
