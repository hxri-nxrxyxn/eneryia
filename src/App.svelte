<script>
  import {Router, Route} from "svelte-routing"
  import Home from "./components/Home.svelte"
  import Scan from "./components/Scan.svelte"
</script>

<main>
    <Route path="/" component={Home}/>
        <Route path="/scan" component={Scan}>
    <Router>
        </Router>
    </main>

<style></style>
