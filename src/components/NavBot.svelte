<script>
    import Home from "../assets/hat-chef.svg";
    import Plus from "../assets/barcode-scan.svg";
    import Fridge from "../assets/refrigerator.svg";
    export let selection;
</script>

<main>
    <div class="nav">
        <div class="nav__side">
            <img src={Home} alt="icon" class:super={selection == "Home"} />
        </div>
        <div class="nav__main">
            <img src={Plus} alt="icon" class:super={selection == "Plus"} />
        </div>
        <div class="nav__side">
            <img src={Fridge} alt="icon" class:super={selection == "Fridge"} />
        </div>
    </div>
</main>

<style>
    .nav {
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        background: black;
        height: 10vh;
        width: calc(100vw - 4rem);
    }
    .nav img {
        width: 1rem;
        filter: invert(100%) sepia(93%) saturate(4%) hue-rotate(198deg)
            brightness(40%) contrast(100%);
    }
    .nav img.super {
        filter: invert(100%) sepia(93%) saturate(4%) hue-rotate(198deg)
            brightness(100%) contrast(100%);
    }
    .nav > div {
        padding: 1rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
    }
</style>
