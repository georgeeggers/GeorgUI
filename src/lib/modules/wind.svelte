<script>
    import { onMount } from "svelte";
    import { draw } from "svelte/transition";
    import { getRandomInt, getID } from "../../global.svelte";
    let show = $state(false);

    let { colors, number, speed } = $props();

    onMount(() => {
        show = true;
    })

    const getRandomCurve = (width, height) => {
        const time = getRandomInt(speed) + 500;
        const size = getRandomInt(3) + 1;
        const color = getRandomInt(4);
        let top = getRandomInt(2) == 0;
        const start = getRandomInt(top ? width : height)

        let output = `M ${top ? start : -10 }, ${top ? -10 : start} L${top ? height + start : height - start}, ${height + 10}`;
        return {size: size, path: output, time: time, id: getID(), color: color};
    }

    let paths = $state([]);

    let width = $state(0);
    let height = $state(0);

    onMount(() => {

        const ro = new ResizeObserver((entries) => {

            for(let i of entries){
                width = i.contentRect.width;
                height = i.contentRect.height;
            }
        });

        ro.observe(boxHandle);

    })

    let boxHandle = $state(null);

    setInterval(() => {
        if(paths.length > number){
            paths.splice(0, 1);
        }
        paths.push(getRandomCurve(width, height))

    }, 1000);


</script>

<div class="mainLines" bind:this={boxHandle}>
    <svg viewBox="0 0 {width} {height}" width='{width}' height='{height}' fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        {#each paths as p, i (p.id)}
            <path d="{p.path}" stroke-width="{9 / p.size}" style='z-index: {3 - p.size}; color: var(--{colors[p.color]});' 
                transition:draw={{ duration: p.time }}
            />
        {/each}
    </svg>

</div>

<style>

    .mainLines {
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
    }

    .mainLines svg {
        width: 100%;
        height: 100%;
    }
</style>