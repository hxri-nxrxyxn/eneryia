<script>
  window.scrollTo({ top: 0, behavior: "smooth" });
  import { Link } from "svelte-routing";
  import Nav from "./Nav.svelte";
  import { collect } from "../script";
  let name = $state("");
  let preference = $state("");
  let intake = $state("");
  let mpd = $state("");
  const onclick = async () => {
    const data = {
      name: name,
      preference: preference,
      intake: intake,
      mpd: mpd,
    };
    console.log(data);
    collect(data);
  };
</script>

<Nav />
<main>
  <div class="contents">
    <h1>
      <span>Tell us your</span>
      <br />
      Preferences
    </h1>
    <div class="form">
      <div class="form__line">
        <label>name</label>
        <input type="text" placeholder="Sebastian" bind:value={name} />
      </div>
      <div class="form__line">
        <label>food preference</label>
        <input type="text" placeholder="Vegetarian" bind:value={preference} />
      </div>
      <div class="form__line">
        <label>Calorie Intake</label>
        <input type="text" placeholder="in mg" required bind:value={intake} />
      </div>
      <div class="form__line">
        <label>Meals per day</label>
        <input type="text" placeholder="3" required bind:value={mpd} />
      </div>
    </div>
  </div>
  <div class="buttons">
    <button {onclick}>Continue</button>
  </div>
</main>

<style>
</style>
