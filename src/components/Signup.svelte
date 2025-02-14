<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { signup } from "../script.js";
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
    let email = $state("");
    let password = $state("");
    const onclick = async () => {
        const data = {
            email: email,
            password: password,
        };
        await signup(data);
    };
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Sign up for</span>
            <br />
            Savr
        </h1>
        <div class="form">
            <div class="form__line">
                <label>email</label>
                <input type="text" placeholder="Email" bind:value={email} />
            </div>
            <div class="form__line">
                <label>password</label>
                <input type="text" placeholder="Email" bind:value={password} />
            </div>
        </div>
    </div>
    <div class="buttons">
        <button {onclick}>Continue</button>
        <Link to="/scan">
            <button class="outline">Scan</button>
        </Link>
    </div>
</main>

<style>
</style>
