<script>
    import { Gamepad, PaintBucket, Binary, Grid, LayoutGrid, Plus, Trash2, Sparkles } from "@lucide/svelte";
    import { replace } from 'svelte-spa-router'; 
    import Toggle from "./modules/toggle.svelte";
    import { getID, getRandomInt } from "../global.svelte";

    let borderRadius = $state(3);
    let univMargin = $state(4);

    let colors = $state([
        {
            name: "main",
            v: 0,
            saturation: 100,
            id: getID()
        },
    ])

    let background = $state({
        v: 0,
        saturation: 15,
        id: getID()
    });

    let text = $state({
        v: 0,
        saturation: 15,
        id: getID()
    });


    const getColorCss = () => {
        let output = "";

        for(let color of colors){
            for(let it = 0; it < 10; it++){
                output += `--${color.name}${it}: ${getColor(color.v, it)}\n`
            }
        }

        for(let it = 0; it < 10; it++){
            output += `--bg${it}: ${getColor(background.v, lightMode ? 9 - it : it, background.saturation, bValues)}\n`
        }

        for(let it = 0; it < 10; it++){
            output += `--text${it}: ${getColor(text.v, lightMode ? it : 9 - it, text.saturation, bValues)}\n`
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

    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);
        alert("CSS Copied");
    }

    const copyColors = async () => {
        const color = getColorCss();

        await navigator.clipboard.writeText(color);
        alert("CSS Copied");
    }

    const interpolate = (t, m) => {
        return ((m * 10) / ((t * m / 100) - m)) + m
    }

    const iValues = [5, 12, 20, 30, 40, 50, 60, 70, 80, 88]
    const bValues = [0, 6,  10, 15, 40, 60, 85, 90, 93, 99]

    const getColor = (angle, i, saturation = 100, values=iValues) => {
        return `hsl(${angle}, ${interpolate(values[i], saturation)}%, ${values[i]}%);`
    }

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
        return `background-color: ${getColor(color.v, 3, color.saturation)} border: 1px solid ${getColor(color.v, 4, color.saturation)}`
    }

    const getInlineBadge = (color) => {
        return `background-color: ${getColor(color.v, 2, color.saturation)} color: ${getColor(color.v, 7, color.saturation)} border: 1px solid ${getColor(color.v, 5, color.saturation)}`
    }

    const generateRandomColors = () => {
        colors.length = 0;
        let main = getRandomInt(180) + 135;
        let secondary = main - getRandomInt(45) - 20
        let warn = getRandomInt(55) + 25;
        let fail = (getRandomInt(30) + 350) % 360;
        let saturation = getRandomInt(40) + 60
        colors = [
            {
                name: "main",
                v: main,
                saturation: saturation,
                id: getID()
            },
            {
                name: "secondary",
                v: secondary,
                saturation: saturation,
                id: getID()
            },
            {
                name: "warn",
                v: warn,
                saturation: saturation,
                id: getID()
            },
            {
                name: "fail",
                v: fail,
                saturation: saturation,
                id: getID()
            },
        ]
        
        let bgSaturation = getRandomInt(20);

        background = {
            v: main,
            saturation: bgSaturation,
            id: getID()
        }

        text = {
            v: main,
            saturation: bgSaturation,
            id: getID()
        }
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

       <div class="wordMarker">
            <p>App Colors</p>
        </div>

        {#each colors as c, i}

            <div class="item">
                <div class="slider">
                    <input type='text' class='bb3' bind:value={c.name} />
                    <p style='padding-top: 10px;'>{c.v}deg</p>
                    <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({c.v}, 100%, 50%);' bind:value={c.v} />
                    <p style='padding-top: 10px;'>{c.saturation}% saturation</p>
                    <input class='bb3' type='range' min="1" max='100' style='accent-color: {getColor(c.v, 50, c.saturation)}' bind:value={c.saturation} />
                </div>
            </div>

        {/each}

        <button onclick={() => colors.push({name: "new_color", v: 0, saturation: 100, id: getID()})} class='btn bb3'>
            <Plus size=20/>
            Add Color
        </button>


        <div class="wordMarker">
            <p>Background</p>
        </div>
        
        <div class="item">

            <div class="slider">
                <p>Light Mode</p>
                <div class="toggleWrapper">
                    <Toggle bind:value={lightMode} />
                </div>
            </div>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {background.v}</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({background.v}, 100%, 50%);' bind:value={background.v} />
                <p style='padding-top: 10px;'>{background.saturation}% saturation</p>
                <input class='bb3' type='range' min="1" max='100' style='accent-color: {getColor(background.v, 50, background.saturation, bValues)}' bind:value={background.saturation} />
            </div>
        </div>

        <div class="wordMarker">
            <p>Text Colors</p>
        </div>

        <div class="item">
            <div class="slider">
                <p>Base - {text.v}</p>
                <input class='bb3' type='range' min="0" max='360' style='accent-color: hsl({text.v}, 100%, 50%);' bind:value={text.v} />
                <p style='padding-top: 10px;'>{text.saturation}% saturation</p>
                <input class='bb3' type='range' min="1" max='100' style='accent-color: {getColor(text.v, 50, text.saturation,bValues)}' bind:value={text.saturation} />
            </div>
        </div>

        <button class='btn main' onclick={copyColors}>
            <div class="svgwrapper">
                <PaintBucket size=20/>
            </div>
            Copy Colors
        </button>
        <button class='btn secondary' onclick={copyValues}>
            <div class="svgwrapper">
                <Binary size=20/>
            </div>
            Copy Code
        </button>

        <button class='btn bb3' onclick={generateRandomColors}>
            <Sparkles size=20 />
            Generate Colors
        </button>

    </div>


    <div class="uiMain">

        <h1>App Colors</h1>

        {#each colors as color}

            <div class="colorArea">
                {#each {length: 10 } as _, i}
                    <label for="{getColor(color.v, i, color.saturation)}" class='color' style='grid-area: c{i}; background-color: {getColor(color.v, i, color.saturation)};'></label>
                    <button class='invis' id='{getColor(color.v, i,color.saturation)}' onclick={() => copyText(getColor(color.v, i, color.saturation))}>Copy Color</button>
                {/each}
            </div>
 
        {/each}

        <div class="contentContainer">
            <p>Badges</p>
            <div class="flexWrap">
                {#each colors as c}
                    <div class="bdg" style="{getInlineBadge(c)}">{c.name}</div>
                {/each}
            </div>

        </div>

        <div class="contentContainer">
            <p>Buttons</p>
            <div class="flexWrap">
                {#each colors as c}
                    <div class="btn" style="{getInlineButton(c)}">{c.name}</div>
                {/each}
            </div>

        </div>

        <h1>Background Colors</h1>
    
        <div class="colorArea">
            {#each {length: 10 } as _, i}
                {@const color = getColor(background.v, lightMode ? 9 - i : i, background.saturation, bValues)}
                <label for="{color}" class='color' style='grid-area: c{i}; background-color: {color}'></label>
                <button class='invis' id='{color}' onclick={() => copyText(color)}>Copy Color</button>
            {/each}
        </div>

        <h1>Text Colors</h1>
    
        <div class="colorArea">
            {#each {length: 10 } as _, i}
                {@const color = getColor(text.v, lightMode ? i : 9 - i, text.saturation, bValues)}
                <label for="{color}" class='color' style='grid-area: c{i}; background-color: {color}'></label>
                <button class='invis' id='{color}' onclick={() => copyText(color)}>Copy Color</button>
            {/each}
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
        cursor: pointer;
    }

    .color:hover {
        border-radius: 10px;
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

    @media (max-width: 1000px){
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