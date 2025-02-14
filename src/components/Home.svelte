<script>
  window.scrollTo({ top: 0, behavior: "smooth" });
  import { Link } from "svelte-routing";
  import Nav from "./Nav.svelte";
  import { login } from "../script.js";
  let email = $state("");
  let password = $state("");
  const onclick = async () => {
    const data = {
      email: email,
      password: password,
    };
    await login(data);
  };
</script>

<Nav />
<main>
  <div class="contents">
    <h1>
      <span>Introducing</span>
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
        <input
          type="password"
          placeholder="Password"
          required
          bind:value={password}
        />
      </div>
    </div>
  </div>
  <div class="buttons">
    <button {onclick}>Login</button>
    <Link to="/signup">
      <button class="outline">Signup</button>
    </Link>
  </div>
</main>

<style>
</style>
