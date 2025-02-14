<script>
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Introducing</span>
            Savr
        </h1>
        <div class="form">
            <div class="form__line">
                <label>email</label>
                <input type="text" placeholder="Email" />
            </div>
            <div class="form__line">
                <label>password</label>
                <input type="text" placeholder="Email" />
            </div>
        </div>
    </div>
    <div class="buttons">
        <Link to="/login">
            <button>Login</button>
        </Link>
        <Link to="/scan">
            <button class="outline">Scan page</button>
        </Link>
    </div>
</main>

<style>
</style>
