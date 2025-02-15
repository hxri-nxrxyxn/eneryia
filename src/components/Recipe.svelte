<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
    import Image from "../assets/paneer.jpg";
    import Stopwatch from "../assets/stopwatch.svg";
    import Hourglass from "../assets/hourglass-end.svg";
    import Smile from "../assets/grin-alt.svg";
    import Muscle from "../assets/muscle.svg";
    import { getRecipe } from "../script";

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get("id");

    const getdata = async () => {
        const data = await getRecipe(id);
        console.log(data);
        document.getElementById("name").textContent = data.name;
        document.getElementById("cookingTime").textContent = data.cooking_time;
        document.getElementById("happy").textContent = data.happy;
        document.getElementById("calories").textContent = data.calories;
        document.getElementById("instructions").textContent = data.instruction;
    };
    getdata();

    // Sample JSON data (replace with your actual data fetching)
    // Function to format the expiry date (customize as needed)

    import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Here's your</span>
            <br />
            Recipe
        </h1>
        <h3 id="name"></h3>
        <div class="recipe">
            <img class="recipe__banner" src={Image} alt="banner" />
            <div class="recipe__details">
                <div class="recipe__details__row">
                    <div class="recipe__detail">
                        <h5>Ingredients Expiring in</h5>
                        <p>
                            <img src={Hourglass} alt="icon" />
                            <b id="cookingTime"></b>
                        </p>
                    </div>
                    <div class="recipe__detail">
                        <h5>Happyness Index</h5>
                        <p><img src={Smile} alt="icon" /> <b id="happy"></b></p>
                    </div>
                </div>
                <div class="recipe__details__row">
                    <div class="recipe__detail">
                        <h5>Calorie Count</h5>
                        <p>
                            <img src={Muscle} alt="icon" />
                            <b id="calories"></b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <h3>Recipe</h3>
        <p id="instructions"></p>
    </div>
    <div class="buttons">
        <Link to="/dashboard">
            <button>Cook</button>
        </Link>
    </div>
</main>

<style>
    h3 {
        margin-bottom: 1rem;
    }
    .recipe {
        margin-bottom: 2rem;
    }
    .recipe__banner {
        width: 100%;
        border-radius: 1rem;
        margin: 1rem 0;
    }
    .recipe__details__row {
        display: flex;
        justify-content: space-between;
    }
    .recipe__details img {
        width: 1rem;
        filter: invert(16%) sepia(19%) saturate(0%) hue-rotate(267deg)
            brightness(102%) contrast(90%);
    }
    .recipe__detail {
        padding-top: 2rem;
        width: 50%;
    }
    .recipe__detail p {
        padding-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>
