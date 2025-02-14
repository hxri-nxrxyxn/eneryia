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

        <div class="featured">
            <h2>Featured</h2>
            <div class="card">
                <div class="card__banner"></div>
                <div class="card__details">
                    <div class="card__top">
                        <h3>Pineapple Curry</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Omnis, quibusdam?
                        </p>
                    </div>
                    <div class="card__bottom">
                        <p>expires <b>2D</b></p>
                        <p>expires <b>2D</b></p>
                        <p>expires <b>2D</b></p>
                        <p>expires <b>2D</b></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="suggested">
            <h2>Suggested</h2>
        </div>
    </div>
</main>

<style>
    h2 {
        margin: 2rem 0;
    }
    .card {
        width: 100%;
        background: #111;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .card h3 {
        margin-bottom: 1rem;
    }
    .card__bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
    .card__bottom p {
        font-size: 0.75rem;
        text-transform: uppercase;
    }
</style>
