<script>
    import { Router, Route } from "svelte-routing";
    import Home from "./components/Home.svelte";
    import Scan from "./components/Scan.svelte";
    import Signup from "./components/Signup.svelte";
</script>

<main>
    <Router>
        <Route path="/" component={Home} />
        <Route path="/scan" component={Scan} />
        <Route path="/signup" component={Signup} />
    </Router>
</main>

<style></style>
