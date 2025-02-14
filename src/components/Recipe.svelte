<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
    import Image from "../assets/paneer.jpg";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Here's your</span>
            <br />
            Recipe
        </h1>
        <h3>Pineapple Curry</h3>
        <div class="recipe">
            <img src={Image} alt="" />
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                saepe atque, reiciendis, veritatis facilis aliquam consequuntur
                facere ullam illum cupiditate consequatur, expedita iure vero.
                Animi dicta numquam soluta doloremque porro.
            </p>
        </div>
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
    .recipe img {
        width: 100%;
        border-radius: 1rem;
        margin: 1rem 0;
    }
</style>
