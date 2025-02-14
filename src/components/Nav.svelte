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
        background-color: transparent;
        z-index: 99;
        margin-bottom: 0.5rem;
        position: relative;
    }
    .nav__stats {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
    }
</style>
