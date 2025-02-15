<script>
    import { Link } from "svelte-routing";
    import NavBot from "./NavBot.svelte";
    import { checkUser, getIngredients } from "../script";

    let ingredients = []; // Initialize an empty array to store ingredients

    const doCheck = async () => {
        try {
            const data = await checkUser();
            if (data && data.ingid) {
                // Check if data and ingid exist
                const arr = await getIngredients(data.ingid);
                ingredients = arr; // Assign the fetched ingredients to the array
                console.log(ingredients); // Log the populated array
            } else {
                console.error("User data or ingid is missing.");
                // Handle the error, e.g., display a message to the user.
            }
        } catch (error) {
            console.error("Error fetching ingredients:", error);
            // Handle the error, e.g., display an error message.
        }
    };

    doCheck(); // Call the function to fetch data when the component initializes
</script>

<NavBot selection="Fridge" />
<main>
    <div class="contents">
        <h1>
            <span>Your</span>
            <br />
            Inventory
        </h1>
        <h3>Remaining Things</h3>
        <div class="cards">
            {#each ingredients as ingredient}
                <div
                    class="card"
                    class:outline={ingredient.quantity === 0 ||
                        ingredient.expiry_date === ""}
                >
                    <h3>{ingredient.name}</h3>
                    <p>Quantity <b>{ingredient.quantity} Nos</b></p>
                    <p>Expire <b>{ingredient.expiry}</b></p>
                </div>
            {:else}
                <p>Loading ingredients...</p>
            {/each}
        </div>
    </div>
</main>

<style>
    /* ... (Your existing CSS styles) */
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
