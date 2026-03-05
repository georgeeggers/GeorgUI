<script>
    import { Gamepad, PaintBucket, Binary, Grid, LayoutGrid, Plus, Trash2, Sparkles } from "@lucide/svelte";
    import { replace } from 'svelte-spa-router'; 
    import Toggle from "./modules/toggle.svelte";
    import { getID, getRandomInt } from "../global.svelte";



    let backgroundColor = $state(222);
    let backgroundVibrancy = $state(9);
    let backgroundLightness = $state(3);
    let backgroundSpread = $state(8);

    let textVibrancy = $state(3);
    let textLightness = $state(10);


    let borderRadius = $state(3);
    let univMargin = $state(4);

    let colors = $state([
        {
            name: "main",
            v: 0,
            id: getID()
        },

    ])


    const getColorCss = () => {
        let output = "";

        for(let color of colors){
            for(let it = 0; it < 10; it++){
                output += `--${color.name}${it}: ${getColor(color.v, it)}\n`
            }
        }

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

.btn {
    padding: 10px;
    display: flex;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color .25s;
    font-size: 14px;
    align-items: center;
    gap: 7px;
}

.btn.bb1:hover {
    background-color: var(--bg2);
}
.btn.bb2:hover {
    background-color: var(--bg3);
}
.btn.bb3:hover {
    background-color: var(--bg4);
}

.bq {   
    border-left: 4px solid var(--bg4);
    color: var(--text1);
    white-space: pre-wrap;
    padding-left: 15px;
    font-style: italic;
}

.bdg {
    padding: 2px 5px 2px 5px;
    width: fit-content;
    border-radius: 100px;
}

@keyframes revealTT {
    from { opacity: 0.0; top: -50% }
    to { opacity: 1.0; top: -100%}
}

.tt {
    position: relative;
    cursor: pointer;
}

.tt:hover .toolTip, .tt:hover .arrow {
    animation: .3s revealTT .7s forwards;
}

.toolTip {
    position: absolute;
    min-width: fit-content;
    left: 50%;
    top: -100%;
    text-wrap: nowrap;
    transform: translate(-50%, -50%);
    padding: 2px 5px 2px 5px;
    pointer-events: none;
    opacity: 0.0;
    border-radius: var(--border-radius);
    height: 20px;
}

.arrow {
    height: 4px;
    width: 4px;
    clip-path: polygon(0 0, 50% 100%, 100% 0);
    position: absolute;
    min-width: fit-content;
    left: 50%;
    top: -100%;
    text-wrap: nowrap;
    transform: translate(-50%, calc(-50% + 17px));
    padding: 2px 5px 2px 5px;
    pointer-events: none;
    opacity: 0.0;
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

/* Generated CSS */
`

        for(let i of colors){
            output += generateCss(i);
        }

        await navigator.clipboard.writeText(output);
        alert("CSS Copied");
    }

    const copyColors = async () => {
        const color = getColorCss();

        await navigator.clipboard.writeText(color);
        alert("CSS Copied");
    }

    const text = (i) => {
        return `hsl(${colors[0].v}, ${10 + (textVibrancy * 5)}%, ${(lightMode ? 10 : 90) - ((10 - textLightness) * (i))}%);`;
    }

    const interpolate = (t) => {
        return (1000 / ((t - 8) - 100)) + 100
    }

    const iValues = [8, 15, 20, 30, 40, 50, 60, 70, 80, 85, 92]

    const getColor = (angle, i) => {
        return `hsl(${angle}, ${interpolate(iValues[i])}%, ${iValues[i]}%);`
    }

    const bg = (i) => {
        return `hsl(${backgroundColor}, ${(0 + (backgroundVibrancy * 2)) - (3 * i)}%, ${(lightMode ? 100 - backgroundLightness : backgroundLightness) + (backgroundSpread * (lightMode ? -i : i))}%);`;
    }

    const bgt = (i) => {
        return `hsla(${backgroundColor}, ${(20 + (backgroundVibrancy * 2)) - (3 * i)}%, ${(lightMode ? 100 - backgroundLightness : backgroundLightness) + (backgroundSpread * (lightMode ? -i : i))}%, 50%);`;
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
            value: 82
        },
        {
            name: "'Thew",
            value: 79
        },
        {
            name: "'Drew",
            value: 74
        },
        {
            name: "Chase",
            value: 68
        },
        {
            name: "'Thew",
            value: 59
        },
        {
            name: "'Drew",
            value: 51
        },
        {
            name: "Chase",
            value: 42
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

    let lightMode = $state(false);

    const generateCss = (color) => {
        let output = ``;


        output += `.${color.name} {
    background-color: var(--${color.name}3);
    border: 1px solid var(--${color.name}4);
}

.btn.${color.name}:hover {
    background-color: var(--${color.name}4);
}

.bdg.${color.name} {
    background-color: var(--${color.name}2);
    color: var(--${color.name}6);
    border: 1px solid var(--${color.name}5);
}`

        return output;
    }

    const getInlineButton = (color) => {
        return `background-color: ${getColor(color.v, 3)} border: 1px solid ${getColor(color.v, 4)}`
    }

    const getInlineBadge = (color) => {
        return `background-color: ${getColor(color.v, 2)} color: ${getColor(color.v, 7)} border: 1px solid ${getColor(color.v, 5)}`
    }

    const generateRandomColors = () => {
        colors.length = 0;
        let main = getRandomInt(270) + 70;
        let secondary = main - getRandomInt(45) - 20
        let warn = getRandomInt(55) + 25;
        let fail = (getRandomInt(30) + 350) % 360;
        colors = [
            {
                name: "main",
                v: main,
                id: getID()
            },
            {
                name: "secondary",
                v: secondary,
                id: getID()
            },
            {
                name: "warn",
                v: warn,
                id: getID()
            },
            {
                name: "fail",
                v: fail,
                id: getID()
            },
        ]
    }

</script>

<div class="wrapper">

    <div class="sideBar scrollOverflow">
        <div class="header">
            <div class="svgWrapper" style='color: var(--main6);'>
                <Gamepad size=30 />
            </div>

            <p>Georg<i>UI</i></p>
        </div>


        <div class="item">

            <div class="slider">
                <p>Light Mode</p>
                <div class="toggleWrapper">
                    <Toggle bind:value={lightMode} />
                </div>
            </div>
        </div>

        {#each colors as c, i}

            <div class="item">
                <div class="slider">
                    <input type='text' class='bb3' bind:value={c.name} />
                    <p style='padding-top: 10px;'>{c.v}deg</p>
                    <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({c.v}, 100%, 50%);' bind:value={c.v} />
                </div>
            </div>

        {/each}

        <button onclick={() => colors.push({name: "new_color", v: 0, id: getID()})} class='btn bb3'>
            <Plus size=20/>
            Add Color
        </button>


        <div class="wordMarker">
            <p>Background</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {backgroundColor}</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({backgroundColor}, 100%, 50%);' bind:value={backgroundColor} />

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

        <button class='btn secondary' onclick={generateRandomColors}>
            <Sparkles size=20 />
            Generate Colors
        </button>

    </div>


    <div class="uiMain" style='background-color: {bg(0)}; padding: {univMargin * 5}px;'>

        {#each colors as color}

            <div class="colorArea">
                {#each {length: 10 } as _, i}
                    <div class='color' style='grid-area: c{i}; background-color: {getColor(color.v, i)};'></div>
                {/each}
            </div>
 
        {/each}

        <div class="contentContainer bb3">
            <p>Badges</p>
            <div class="flexWrap">
                {#each colors as c}
                    <div class="bdg" style="{getInlineBadge(c)}">{c.name}</div>
                {/each}
            </div>

        </div>

        <div class="contentContainer bb3">
            <p>Buttons</p>
            <div class="flexWrap">
                {#each colors as c}
                    <div class="btn" style="{getInlineButton(c)}">{c.name}</div>
                {/each}
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

    .flexWrap {
        width: 300px;
        display: flex;
        flex-direction: row;
        gap: 10px;
        flex-wrap: wrap;
    }

    .contentContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    .contentContainer > p {
        font-size: 18px;
    }

    .color {
        height: 75px;
        border-radius: 5px;
    }

    .colorArea {

        width: 100%;
        gap: 5px;

        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-rows: 75px;
        grid-template-areas: 
            "c0 c1 c2 c3 c4 c5 c6 c7 c8 c9" 
        ;
        box-sizing: border-box;
    }

    @media (max-width: 750px){
        .colorArea {
            grid-template-areas: 
                "c0 c1 c2 c3 c4"
                "c5 c6 c7 c8 c9" 
            
            ;
        }
    }

    .toggleWrapper {
        width: 50px;
        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
        gap: 10px;
    }

    button {
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
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
        color: var(--main6);
        font-style: normal;
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

</style>