<script>
    import { onMount } from "svelte";
    import { draw } from "svelte/transition";
    import { getRandomInt, getID } from "../../global.svelte";
    let show = $state(false);

    onMount(() => {
        show = true;
    })

    const getRandomCurve = (width, height) => {
        const time = getRandomInt(4000) + 500;
        const size = getRandomInt(3) + 1;
        const color = getRandomInt(4);
        const startX = getRandomInt(width)
        const endX = startX + (getRandomInt(100) - 50);
        let firstIsLeft = false;
        if(getRandomInt(1) == 1){
            firstIsLeft = true;
        }

        const v = getRandomInt(4) + 1;

        const f1X = (width / 2) + ((getRandomInt(width / v)) / size) * (firstIsLeft ? -1 : 1);
        const f1Y = (height / 2) + ((getRandomInt(height / v)) / size);

        const f2X = (width / 2) + ((getRandomInt(width / v)) / size) * (firstIsLeft ? 1 : -1);
        const f2Y = (height / 2) + ((getRandomInt(height / v)) / size) - 50;

        let output = `M${startX}, -10 C${f1X}, ${f1Y} ${f2X}, ${f2Y} ${endX}, ${height}`;
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
        if(paths.length > 10){
            paths.splice(0, 1);
        }
        paths.push(getRandomCurve(width, height))

    }, 1000);

    const colors = ["main1", "main2", "main3", "text1"]

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