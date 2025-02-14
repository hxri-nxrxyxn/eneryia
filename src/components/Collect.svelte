<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
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
                <input type="text" placeholder="Neona Sebastian" />
            </div>
            <div class="form__line">
                <label>food preference</label>
                <input type="text" placeholder="Vegetarian" />
            </div>
            <div class="form__line">
                <label>Calorie Intake</label>
                <input type="text" placeholder="in mg" required />
            </div>
            <div class="form__line">
                <label>Meals per day</label>
                <input type="text" placeholder="3" required />
            </div>
        </div>
    </div>
    <div class="buttons">
        <Link to="/terms">
            <button>Continue</button>
        </Link>
    </div>
</main>

<style>
</style>
