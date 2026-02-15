<script>

import Router from "svelte-spa-router";
import { routes } from "./routes.svelte";
</script>


<div class="globalArea">

<Router {routes} />

</div>


<style>
  .globalArea {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
  }
</style>