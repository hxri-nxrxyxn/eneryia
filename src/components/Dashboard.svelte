<script>
    window.scrollTo({ top: 0, behavior: "smooth" });
    import NavBot from "./NavBot.svelte";
    import Stopwatch from "../assets/stopwatch.svg";
    import Hourglass from "../assets/hourglass-end.svg";
    import Smile from "../assets/grin-alt.svg";
    import Muscle from "../assets/muscle.svg";
</script>

<main>
    <div class="contents">
        <h1>
            <span>Your</span>
            <br />
            Recipies
        </h1>

        <div class="featured">
            <h2>Featured</h2>
            <div class="card">
                <div class="card__banner"></div>
                <div class="card__details">
                    <div class="card__top">
                        <h3>Paneer Curry</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Omnis, quibusdam?
                        </p>
                    </div>
                    <div class="card__bottom">
                        <p><img src={Stopwatch} alt="icon" /> <b>2D</b></p>
                        <p><img src={Hourglass} alt="icon" /> <b>2D</b></p>
                        <p><img src={Smile} alt="icon" /> <b>2D</b></p>
                        <p><img src={Muscle} alt="icon" /> <b>2D</b></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="suggested">
            <h2>Suggested</h2>
            <div class="card">
                <div class="card__banner"></div>
                <div class="card__details">
                    <div class="card__top">
                        <h3>Paneer Curry</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Omnis, quibusdam?
                        </p>
                    </div>
                    <div class="card__bottom">
                        <p><img src={Stopwatch} alt="icon" /> <b>2D</b></p>
                        <p><img src={Hourglass} alt="icon" /> <b>2D</b></p>
                        <p><img src={Smile} alt="icon" /> <b>2D</b></p>
                        <p><img src={Muscle} alt="icon" /> <b>2D</b></p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__banner"></div>
                <div class="card__details">
                    <div class="card__top">
                        <h3>Paneer Curry</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Omnis, quibusdam?
                        </p>
                    </div>
                    <div class="card__bottom">
                        <p><img src={Stopwatch} alt="icon" /> <b>2D</b></p>
                        <p><img src={Hourglass} alt="icon" /> <b>2D</b></p>
                        <p><img src={Smile} alt="icon" /> <b>2D</b></p>
                        <p><img src={Muscle} alt="icon" /> <b>2D</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<NavBot selection="Home" />

<style>
    h2 {
        margin: 2rem 0;
    }
    .featured .card {
        border: 2px solid var(--color-primary);
    }
    .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #111;
        border-radius: 10px;
        margin: 1rem 0;
        margin-bottom: 3rem;
        justify-content: space-between;
    }
    .card__details {
        padding: 1rem;
    }
    .card__banner {
        background:
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url("../assets/paneer.jpg");
        background-size: cover;
        background-position: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        height: 20vh;
    }
    .card h3 {
        margin-bottom: 1rem;
    }
    .card__top p {
        font-size: 0.75rem;
    }
    .card__bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }
    .card__bottom p {
        font-size: 0.75rem;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
    .card__bottom img {
        height: 1rem;
        filter: invert(16%) sepia(19%) saturate(0%) hue-rotate(267deg)
            brightness(102%) contrast(90%);
    }
</style>
