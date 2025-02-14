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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            doloremque, dolor impedit fugiat sint et error a ipsam tenetur.
            Impedit minus, amet laudantium deserunt tenetur animi, quos sit ipsa
            dolores magni nisi tempora explicabo. Totam sunt natus ea, nihil
            animi similique accusantium maiores aliquam recusandae officiis,
            voluptas adipisci quod magni quasi sequi unde ex vero at ratione
            doloremque quam nesciunt harum facere distinctio. Repellat qui rerum
            dolores fugit sunt eligendi animi incidunt, architecto quaerat! At
            suscipit incidunt repudiandae in dicta, laboriosam facilis
            praesentium nisi accusamus illum ea nulla sed saepe.
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
