<script>
    import { Link } from "svelte-routing";
    import Home from "../assets/hat-chef.svg";
    import Plus from "../assets/barcode-scan.svg";
    import Fridge from "../assets/refrigerator.svg";
    export let selection;
</script>

<main>
    <div class="nav">
        <div class="nav__side">
            <Link to="/dashboard">
                <img src={Home} alt="icon" class:super={selection == "Home"} />
            </Link>
        </div>
        <div class="nav__main">
            <Link to="/scan">
                <img src={Plus} alt="icon" class:super={selection == "Plus"} />
            </Link>
        </div>
        <div class="nav__side">
            <Link to="/inventory">
                <img
                    src={Fridge}
                    alt="icon"
                    class:super={selection == "Fridge"}
                />
            </Link>
        </div>
    </div>
</main>

<style>
    .nav {
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #111;
        height: 7.5vh;
        width: 100vw;
        padding: 0 2rem;
    }
    .nav img {
        width: 1rem;
        filter: invert(100%) sepia(93%) saturate(4%) hue-rotate(198deg)
            brightness(40%) contrast(100%);
    }
    .nav img.super {
        filter: invert(88%) sepia(7%) saturate(3550%) hue-rotate(53deg)
            brightness(89%) contrast(81%);
    }
    .nav > div {
        padding: 1rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
    }
</style>
