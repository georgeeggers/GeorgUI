<script>

let { value = $bindable(), action = () => {}} = $props();

let click = () => {
    value = !value; 
    action();
}

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="main" onclick={click} style="{value ? "background-color: var(--main1);" : ""}">
    <div class="toggleDot" style='left: {value ? "calc(100% - 25px);" : "5px;"}'></div>
</div>

<style>

    .toggleDot {
        height: 20px;
        width: 20px;
        border-radius: 100%;
        position: absolute;
        background-color: var(--text1);
        transition: left .25s ease;
    }

    .main {
        min-width: 60px;
        height: 30px;
        padding: 10px;
        background-color: var(--bg2);
        border-radius: 100px;
        cursor: pointer;
        align-items: center;
        gap: 10px;
        flex-direction: row;
        display: flex;
        cursor: pointer;
        position: relative;
        border: 1px solid var(--bg3);
        box-sizing: border-box;
        color: var(--text1);
        transition: background-color .25s ease;
    }
</style>