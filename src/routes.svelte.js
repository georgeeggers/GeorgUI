import Main from "./lib/main.svelte";
import Modules from "./lib/modules.svelte";
import CssOnly from "./lib/cssOnly.svelte";
export const routes = {
    "/": Main,
    "/modules": Modules,
    "/cssOnly": CssOnly
}