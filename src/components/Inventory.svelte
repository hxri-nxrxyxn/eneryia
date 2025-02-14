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
        <h3>Remaining Things</h3>
        <div class="cards">
            <div class="card">
                <h3>Item</h3>
                <p>Quantity <b>3Nos</b></p>
                <p>Expire <b>3D</b></p>
            </div>
            <div class="card">
                <h3>Item</h3>
                <p>Quantity <b>3Nos</b></p>
                <p>Expire <b>3D</b></p>
            </div>
            <div class="card outline">
                <h3>Item</h3>
                <p>Quantity <b>0Nos</b></p>
                <p>Expire <b>0D</b></p>
            </div>
        </div>
    </div>
    <div class="buttons">
        <Link to="/dashboard">
            <button>send reminder</button>
        </Link>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
    .card {
        margin-bottom: 2rem;
        background: #111;
        padding: 1rem;
        border-radius: 10px;
    }
    .outline {
        background: transparent;
        border: 2px dashed #333;
    }
    p b {
        float: right;
    }
    .outline p b {
        color: red;
    }
</style>
