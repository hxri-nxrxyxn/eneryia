<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Scan from "./components/Scan.svelte";
  import Signup from "./components/Signup.svelte";
  import Collect from "./components/Collect.svelte";
  import Terms from "./components/Terms.svelte";
  import Dashboard from "./components/Dashboard.svelte";
  import Recipe from "./components/Recipe.svelte";
  import Inventory from "./components/Inventory.svelte";
</script>

<main>
  <Router>
    <Route path="/" component={Dashboard} />
    <Route path="/login" component={Home} />
    <Route path="/scan" component={Scan} />
    <Route path="/signup" component={Signup} />
    <Route path="/collect" component={Collect} />
    <Route path="/terms" component={Terms} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/recipe" component={Recipe} />
    <Route path="/inventory" component={Inventory} />
  </Router>
</main>

<style></style>
