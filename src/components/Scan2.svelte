<script>
    import NavBot from "./NavBot.svelte";
    import { Link } from "svelte-routing";
    import {
        generteRecipe,
        checkPermission,
        logout,
        checkUser,
    } from "../script";
    window.scrollTo({ top: 0, behavior: "smooth" });
    checkUser();

    import Keyboard from "../assets/keyboard.svg";
    import Eye from "../assets/vision-target.svg";
    import Barcode from "../assets/qr-scan.svg";
</script>

<NavBot selection="Plus" />
<main>
    <div class="contents">
        <h1>
            <span>Add to</span>
            <br />
            Inventory
        </h1>
        <h3>Input by</h3>
        <div class="grid">
            <div class="grid__row">
                <Link to="/keyboard">
                    <div class="grid__column">
                        <img src={Keyboard} alt="" />
                        <h5>Manual</h5>
                    </div>
                </Link>
                <Link to="/eye">
                    <div class="grid__column">
                        <img src={Eye} alt="" />
                        <h5>Picture</h5>
                    </div>
                </Link>
            </div>
            <div class="grid__row">
                <Link to="/barcode">
                    <div class="grid__column">
                        <img src={Barcode} alt="" />
                        <h5>Scan</h5>
                    </div>
                </Link>
                <div class="grid__column red" onclick={logout}>
                    <h5>Logout</h5>
                </div>
            </div>
            <div class="grid__row">
                <div class="grid__column green" onclick={generteRecipe}>
                    <img src={Barcode} alt="" />
                    <h5>Generate Responses</h5>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
    .grid__row {
        display: flex;
        justify-content: space-between;
    }
    .grid__column {
        width: calc((100vw - 6rem) / 2);
        height: calc((100vw - 6rem) / 2);
        background: #111;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
    }
    .grid__column h5 {
        font-size: 0.75rem;
        transform: translateY(0.5rem);
        color: white;
    }
    .grid__column img {
        width: 2rem;
        filter: invert(79%) sepia(55%) saturate(515%) hue-rotate(53deg)
            brightness(90%) contrast(79%);
    }
    .red {
        background: red;
    }
</style>
