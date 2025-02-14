<script>
    import { Link } from "svelte-routing";
    import Nav from "./Nav.svelte";
</script>

<Nav />
<main>
    <div class="contents">
        <h1>
            <span>Introducing</span>
            Savr
        </h1>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam
            facere similique eaque tempore modi, fugiat ad nemo porro. Fugiat
            nostrum possimus, quas beatae tenetur incidunt? Consequuntur harum
            doloremque ut optio esse, soluta odit, ab nobis tenetur delectus
            aliquam quaerat molestiae dolorem. Obcaecati mollitia molestiae ad
            maxime ullam debitis accusantium itaque explicabo, fugit aspernatur
            alias nulla atque dolorem sunt laborum corrupti ipsam temporibus
            odit porro. Voluptates iure animi excepturi odio, quos magnam qui
            recusandae ut minima nam non nulla cupiditate consectetur quasi ipsa
            esse inventore temporibus error harum quia praesentium molestias.
        </p>
    </div>
    <div class="buttons">
        <Link to="/login">
            <button>Login</button>
        </Link>
        <Link to="/scan">
            <button class="outline">Scan page</button>
        </Link>
    </div>
</main>

<style>
</style>
