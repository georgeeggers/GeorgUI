<script>
    import { Gamepad, PaintBucket, Binary, Grid, LayoutGrid } from "@lucide/svelte";
    import { replace } from 'svelte-spa-router'; 
    import { onMount } from "svelte";
    import { getID, getRandomInt } from "../global.svelte";
    import { draw } from "svelte/transition";


    let mainColor = $state(222);
    let mainVibrancy = $state(16);
    let mainLightness = $state(9);
    let mainSpread = $state(9);

    let backgroundColor = $state(222);
    let backgroundVibrancy = $state(9);
    let backgroundLightness = $state(3);
    let backgroundSpread = $state(8);

    let textVibrancy = $state(3);
    let textLightness = $state(10);

    let failColor = $state(0);
    let failVibrancy = $state(16);
    let failLightness = $state(9);
    let failSpread = $state(9);

    let borderRadius = $state(3);
    let univMargin = $state(4);

    $effect(() => {
        backgroundColor = mainColor;
    })

    $effect(() => {
        failVibrancy = mainVibrancy;
    })

    $effect(() => {
        failLightness = mainLightness;
    })

        $effect(() => {
        failSpread = mainSpread;
    })


    const getColorCss = () => {
        let output = "";
        for(let i = 0; i < 6; i++){
            const color = `--main${i + 1}: ${main(6 - i)}`;
            output += color + "\n";
        }
        output += "\n";

        for(let i = 0; i < 4; i++){
            const color = `--bg${i + 1}: ${bg(i)}`;
            output += color + "\n";
        }
        output += "\n";

        for(let i = 0; i < 4; i++){
            const color = `--bgt${i + 1}: ${bgt(i)}`;
            output += color + "\n";
        }
        output += "\n";

        for(let i = 0; i < 4; i++){
            const color = `--text${i + 1}: ${text(i)}`;
            output += color + "\n";
        }
        output += "\n";

        for(let i = 0; i < 6; i++){
            const color = `--fail${i + 1}: ${fail(6 - i)}`;
            output += color + "\n";
        }
        output += "\n";
        return output;
    }

    const copyValues = async () => {
        let output = 
`
:root {
    font-family: monospace;
    line-height: 1.5;
    background-color: var(--bg1);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    scrollbar-width: none;
    color: var(--text1);

`;
    output += getColorCss();

    output += `--border-radius: ${borderRadius * 5}px;\n`;
    output += `--uiPadding: ${univMargin * 5}px;\n`;

    output += "}\n";

    output += 
`
button, input, p, h1 {
    color: var(--text1);
}

.invis {
    scale: 0;
    position: fixed;
}

input, textarea {
  touch-action: manipulation;
}

.svgWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    color: var(--text1);
}

.uiMain {
    width: 100%;
    height: 100%;

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    place-items: center;
    padding: var(--uiPadding);

    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: 0px;
    -ms-overflow-style: none;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.scrollOverflow {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: 0px;
    -ms-overflow-style: none;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

p {
    margin: 0px;
}

.bb1 {
    background-color: var(--bg1);
    border: 1px solid var(--bg2);
    border-radius: var(--border-radius);
}

.bb2 {
    background-color: var(--bg2);
    border: 1px solid var(--bg3);
    border-radius: var(--border-radius);
}

.bb3 {
    background-color: var(--bg3);
    border: 1px solid var(--bg4);
    border-radius: var(--border-radius);
}

.btn1, .btn2, .btn3, .btnM, .btnF {
    padding: 10px;
    display: flex;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color .25s;
}
.btn1 {
    background-color: var(--bg1);
    border: 1px solid var(--bg2);
}
.btn1:hover {
    background-color: var(--bg2);
}
.btn2 {
    background-color: var(--bg2);
    border: 1px solid var(--bg3);
}
.btn2:hover {
    background-color: var(--bg3);
}
.btn3 {
    background-color: var(--bg3);
    border: 1px solid var(--bg4);
}
.btn3:hover {
    background-color: var(--bg4);
}
.btnM {
    background-color: var(--main3);
    border: 1px solid var(--main1);
}
.btnM:hover {
    background-color: var(--main1);
}
.btnF {
    background-color: var(--fail3);
    border: 1px solid var(--fail1);
}
.btnF:hover {
    background-color: var(--fail1);
}

.bq {
    border-left: 4px solid var(--bg4);
    color: var(--text1);
    white-space: pre-wrap;
    padding-left: 15px;
    font-style: italic;
}

@keyframes loading {
    from { rotate: 0deg }
    to { rotate: 360deg }
}
.loading {
    animation: 1.5s loading infinite;
}

@keyframes shake {
    0% { transform: translateX(0); }
    33% { transform: translateX(-5px); }
    66% { transform: translateX(5px); }
    100% { transform: translateX(0); }
}

.shake:hover {
    animation: .5s shake forwards;

}

@keyframes wiggle {
    0% { transform: rotate(0deg); }
    33% { transform: rotate(-5deg); }
    66% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
}

.wiggle:hover {
    animation: wiggle .5s;
}


`
        await navigator.clipboard.writeText(output);
        alert("CSS Copied");
    }

    const copyColors = async () => {
        const color = getColorCss();

        await navigator.clipboard.writeText(color);
        alert("CSS Copied");
    }

    const text = (i) => {
        return `hsl(${mainColor}, ${10 + (textVibrancy * 5)}%, ${90 - ((10 - textLightness) * (i))}%);`;
    }

    const main = (i) => {
        return `hsl(${mainColor}, ${40 + mainVibrancy * 2}%, ${10 + 2 * mainLightness + (mainSpread * i) / 2}%);`
    }

    const bg = (i) => {
        return `hsl(${backgroundColor}, ${(0 + (backgroundVibrancy * 2)) - (3 * i)}%, ${backgroundLightness + (backgroundSpread * i)}%);`;
    }

    const bgt = (i) => {
        return `hsla(${backgroundColor}, ${(20 + (backgroundVibrancy * 2)) - (3 * i)}%, ${backgroundLightness + (backgroundSpread * i)}%, 50%);`;
    }
    
    const fail= (i) => {
        return `hsl(${failColor}, ${40 + failVibrancy * 2}%, ${10 + 2 * failLightness + (failSpread * i) / 2}%);`
    }

    let points = $state([
        {
            name: "Rajesh",
            value: 100
        },
        {
            name: "Rajun",
            value: 92
        },
        {
            name: "Jayden",
            value: 87
        },
        {
            name: "Chase",
            value: 68
        },
        {
            name: "'Thew",
            value: 48
        },
        {
            name: "'Drew",
            value: 32
        }
    ])

    const getMax = (points) => {
        let max = 0;
        for(let i of points){
            if(i.value > max){
            max = i.value;
            }
        }
        return max;
    }

    let max = $derived(getMax(points));

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

    const getColors = (b1, b2) => {
        let output = [];
        for(let i = 0; i < 6; i++){
            let color = main(6 - i);
            output.push(color);
            color = fail(6 - i);
            output.push(color);
        }
        console.log(output);
        return output;

    }

    let colors = $derived(getColors(mainColor, failColor));

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





</script>

<div class="wrapper">

    <div class="sideBar scrollOverflow">
        <div class="header">
            <div class="svgWrapper" style='color: var(--main1);'>
                <Gamepad size=30 />
            </div>

            <p>Georg<i>UI</i></p>
        </div>

        <div class="wordMarker">
            <p>Main Colors</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {mainColor}deg</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({mainColor}, 100%, 50%);' bind:value={mainColor} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Vibrancy - {mainVibrancy}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={mainVibrancy} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Lightness - {mainLightness}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={mainLightness} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Spread - {mainSpread}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={mainSpread} />
            </div>
        </div>




        <div class="wordMarker">
            <p>Background</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {backgroundColor}</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({backgroundColor}, 100%, 50%);' bind:value={backgroundColor} />

            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Vibrancy - {backgroundVibrancy}</p>
                <input class='bb3' type='range' min="0" max='30' bind:value={backgroundVibrancy} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Lightness - {backgroundLightness}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={backgroundLightness} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Spread - {backgroundSpread}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={backgroundSpread} />
            </div>
        </div>



        <div class="wordMarker">
            <p>Text</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Vibrancy - {textVibrancy}</p>
                <input class='bb3' type='range' min="1" max='10' bind:value={textVibrancy} />
            </div>
        </div>

        <div class="item">
            <div class="slider">
                <p>Lightness - {textLightness}</p>
                <input class='bb3' type='range' min="1" max='20' bind:value={textLightness} />
            </div>
        </div>




        <div class="wordMarker">
            <p>Fail</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {failColor}deg</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({failColor}, 100%, 50%);' bind:value={failColor} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Vibrancy - {failVibrancy}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={failVibrancy} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Lightness - {failLightness}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={failLightness} />
            </div>
        </div>
        <div class="item">
            <div class="slider">
                <p>Spread - {failSpread}</p>
                <input class='bb3' type='range' min="0" max='20' bind:value={failSpread} />
            </div>
        </div>

        <div class="wordMarker">
            <p>Misc</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Border Radius - {borderRadius * 5}px</p>
                <input class='bb3' type='range' min="1" max='10' bind:value={borderRadius} />
            </div>
        </div>

        <div class="item">
            <div class="slider">
                <p>Margin - {univMargin * 5}px</p>
                <input class='bb3' type='range' min="1" max='10' bind:value={univMargin} />
            </div>
        </div>

        <button class='btn main' onclick={copyColors}>
            <div class="svgwrapper">
                <PaintBucket size=20/>
            </div>
            Copy Colors
        </button>
        <button class='btn bb3' onclick={copyValues}>
            <div class="svgwrapper">
                <Binary size=20/>
            </div>
            Copy Code
        </button>

    </div>


    <div class="uiMain" style='background-color: {bg(0)}; padding: {univMargin * 5}px;'>

        <div class="gridBox">
            <div class="gbItem noPad" style='grid-area: box-1; background-color: {bg(1)}; border-radius: {borderRadius * 5}px; border: 1px solid {bg(2)};'>
                <div class="mainLines" bind:this={boxHandle}>
                    <svg viewBox="0 0 {width} {height}" width='{width}' height='{height}' fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        {#each paths as p, i (p.id)}
                            <path d="{p.path}" stroke-width="{9 / p.size}" style='z-index: {3 - p.size}; color: {colors[p.color]};' 
                                transition:draw={{ duration: p.time }}
                            />
                        {/each}
                    </svg>

                </div>
            </div>

            <div class="gbItem" style='grid-area: box-2; background-color: {bg(1)}; border-radius: {borderRadius * 5}px; border: 1px solid {bg(2)};'>
                <div class="title">
                    <p style="color: {text(0)}">Main</p>
                </div>

                <div class="barMain" style='color: {text(0)}'>

                    {#each points as p, i}
                        <div class="barWrapper">
                            <div class="bar" style="height: {(p.value / max) * 80}%; background-color: {main(6 - i)};">
                            </div>
                        </div>
                    {/each}

                </div>
            </div>

            <div class="gbItem" style='grid-area: box-3; background-color: {bg(1)}; border-radius: {borderRadius * 5}px; border: 1px solid {bg(2)};'>
                <div class="title">
                    <p style="color: {text(0)}">Fail</p>
                </div>

                <div class="barMain" style='color: {text(0)}'>
                    {#each points as p, i}
                        <div class="barWrapper">
                            <div class="bar" style="height: {(p.value / max) * 80}%; background-color: {fail(6 - i)};">
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="gbItem" style='grid-area: box-4; background-color: {bg(2)}; border-radius: {borderRadius * 5}px; border: 1px solid {bg(3)};'>
                <div class="title">
                    <p style="color: {text(0)}">Text 1</p>
                </div>
                <div class="todoList">
                    <p style="color: {text(1)}">Text 2</p>
                    <p style="color: {text(2)}">Text 3</p>
                    <p style="color: {text(3)}">Text 4</p>
                </div>
            </div>

        </div>
    
    </div>

</div>

<button class="moveButton bb3"
    onclick={() => replace('/modules')}
>
    <div class="svgWrapper">
        <LayoutGrid size=30 />
    </div>
</button>

<style>

    .mainLines {
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        height: 300px;
    }

    .mainLines svg {
        width: 100%;
        height: 100%;
    }

    button {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .todoList {
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-sizing: border-box;
    }

    .title {
        font-size: 30px;
        font-weight: bold;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }

    .sideBar {
        background-color: var(--bg2);
        min-width: 300px;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 10px;
        border-right: 1px solid var(--bg3);
    }

    .wordMarker {
        width: 100%;
        padding: 20px 20px 10px 20px;
        color: var(--text3);
        box-sizing: border-box;
        font-size: 14px;
        opacity: 0.5;
    }

    p {
        margin: 0px;
    }

    i {
        color: var(--main1);
    }

    .header {
        width: 100%;
        height: fit-content;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        padding: 30px;
        box-sizing: border-box;
        color: var(--text2);
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    input {
        padding: 10px;
        font-size: 18px;
    }

    .uiMain {
        gap: 20px;
    }

    .gridBox {
        margin-top: auto;
        margin-bottom: auto;
        display: grid;
        width: 100%;
        grid-auto-columns: 1fr;
        grid-auto-rows: 1fr;
        grid-template-areas: 
        "box-1 box-1 box-3 box-3"
        "box-1 box-1 box-3 box-3"
        "box-2 box-2 box-2 box-4"
        "box-2 box-2 box-2 box-4"
        ;
        box-sizing: border-box;
        gap: 1em;
    }

    .gbItem {
        border-radius: 5px;
        display: flex;
        position: relative;
        flex-direction: column;
        padding: 10px;
        box-sizing: border-box;
    }

    .item {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 5px 10px 5px 10px;
    }

    .slider {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-left: 10px;
        font-size: 16px;

    }

    .slider input {
        width: 80%;
        border: none;
        background-color: none;
    }

    input[type='range']{
        accent-color: var(--text1);
        outline: none;
    }

    .barMain {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
        gap: 5px;
    }

    .bar {
        width: 100%;
        margin-top: auto;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
    }

    .barWrapper {
        width: 100%;
        display: flex;
        height: 100%;
        position: relative;
    }

    .noPad {
        padding: none;
    }
    

</style>