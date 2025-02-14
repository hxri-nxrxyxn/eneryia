<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                <input type="password" placeholder="Password" required />
            </div>
        </div>
    </div>
    <div class="buttons">
        <Link to="/dashboard">
            <button>Login</button>
        </Link>
        <Link to="/signup">
            <button class="outline">Signup</button>
        </Link>
    </div>
</main>

<style>
</style>
