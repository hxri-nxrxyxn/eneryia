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
    };
    getdata();

    // Sample JSON data (replace with your actual data fetching)
    let recipeData = {
        data: {
            calories: 200,
            expiry_date: "2024-04-20", // Example date format
            id: 1,
            name: "butter",
            quantity: 5,
        },
        message: "Retrieved Recipe",
    };

    // Function to format the expiry date (customize as needed)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options); // Uses user's locale
    }

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
        <h3>Pineapple Curry</h3>
        <div class="recipe">
            <img class="recipe__banner" src={Image} alt="banner" />
            <div class="recipe__details">
                <div class="recipe__details__row">
                    <div class="recipe__detail">
                        <h5>Ingredients Expiring in</h5>
                        {#if recipeData.data.expiry_date}
                            <p>
                                <img src={Hourglass} alt="icon" />
                                <b>{formatDate(recipeData.data.expiry_date)}</b>
                            </p>
                        {:else}
                            <p><img src={Hourglass} alt="icon" /> <b>N/A</b></p>
                        {/if}
                    </div>
                    <div class="recipe__detail">
                        <h5>Can be cooked in</h5>
                        <p>
                            <img src={Stopwatch} alt="icon" /> <b>20 Min</b>
                        </p>
                    </div>
                </div>
                <div class="recipe__details__row">
                    <div class="recipe__detail">
                        <h5>Happyness Index</h5>
                        <p><img src={Smile} alt="icon" /> <b>2D</b></p>
                    </div>
                    <div class="recipe__detail">
                        <h5>Calorie Count</h5>
                        {#if recipeData.data.calories}
                            <p>
                                <img src={Muscle} alt="icon" />
                                <b>{recipeData.data.calories}</b>
                            </p>
                        {:else}
                            <p><img src={Muscle} alt="icon" /> <b>N/A</b></p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        <br />
        <h3>Recipe</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis enim
            sunt praesentium iure amet voluptatum cumque ut officia maiores
            pariatur! Obcaecati quisquam odit enim nesciunt quia. Ad provident
            repudiandae, rem ullam iure iste aut assumenda. <br /><br />Maxime
            dolorem dolore beatae incidunt distinctio tenetur assumenda, qui
            asperiores nam excepturi reiciendis voluptatum quae minima officiis
            amet totam dicta sequi illo, voluptatibus soluta consectetur
            blanditiis sapiente voluptate in! Cupiditate fugiat vel odit
            officiis magni, minus voluptas, vitae dicta illum enim ex excepturi
            quidem? Ex dolore aut tempore quos id! Odit architecto a ab commodi!
        </p>
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
