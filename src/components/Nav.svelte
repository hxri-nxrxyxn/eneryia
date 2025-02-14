<script>
    import { Link } from "svelte-routing";
</script>

<main>
    <div class="nav">
        <div class="nav__icon"></div>
        <div class="nav__stats">
            <h5>Hari</h5>
        </div>
    </div>
</main>

<style>
    .nav {
        display: flex;
        background-color: white;
        z-index: 99;
        margin-bottom: 0.5rem;
        position: relative;
    }
    .nav__placeholder {
        flex: 1;
        color: transparent;
    }
    .nav__icon img {
        scale: 1.2;
    }
    .nav__stats {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
    }
    .nav__dropdown {
        position: absolute;
        left: 0;
        top: 0;
        background-color: white;
        width: 100%;
        height: 100vh;
        display: none;
    }
    .nav__dropdown p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: 300;
    }
</style>
