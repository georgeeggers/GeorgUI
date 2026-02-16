export const toggleCode = 
`<script>

let { value = $bindable(), action = () => {}} = $props();

let click = () => {
    value = !value; 
    action();
}

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="main" onclick={click} style="{value ? "background-color: var(--main3);" : ""}">
    <div class="toggleDot" style='left: {value ? "calc(100% - 25px);" : "5px;"}'></div>
</div>

<style>

    .toggleDot {
        height: 20px;
        width: 20px;
        border-radius: 100%;
        position: absolute;
        background-color: white;
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
        border: 1px solid var(--bg4);
        box-sizing: border-box;
        color: var(--text1);
        transition: background-color .25s ease;
    }
</style>`


export const textAreaCode = 
`<script>
    // this is my best attempt at working around the lack of support for field-sizing: content; on non chromium platforms

    let {value = $bindable(), placeholder = "Placeholder...", style="", fontSize = 20, padding = 20} = $props();

    const handleStroke = (e) => {
        // this is so stupid and I hate it
        // webkit needs to get their stuff together because there is no reason I should be making my own function to DELETE TEXT
        if (e.key == "Backspace") {
            setTimeout(() => {
                if (value.length == 1) {
                    if (value == "\n") {
                        value = "";
                    }
                }
            });
        }
    };

    let focusElement;

    function focusEditable() {
        focusElement.focus();
    }

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    class="wrapper"
    role="textbox"
    tabindex="0"
    style={style} 
    onclick={() => focusEditable()}
>

    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <div
        contenteditable="true"
        style="font-size: calc({fontSize}px + var(--font-size-modifier)); padding: {padding}px;"
        role="textbox"
        bind:innerText={value}
        data-placeholder="{placeholder}"
        class="p"
        onkeydown={handleStroke}
        bind:this={focusElement}

    ></div>
</div>

<style>
    .wrapper {
        position: relative;
        width: fit-content;
        height: fit-content;
        display: flex;
        min-width: 100%;
    }

    .p {
        display: flex;
        box-sizing: border-box;
        white-space: pre-wrap;
        text-align: left;
        position: relative;
        flex-direction: column;
        resize: none;
        outline: none !important;
        min-width: 1px;
        min-height: 1px;
        transform: none;
        color: var(--text1);
    }

    .p:empty:before {
        content: attr(data-placeholder);
        opacity: 0.5;
        pointer-events: none;
    }
</style>`

export const splashCode = 
`<script>
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

        let output = \`M\${startX}, -10 C\${f1X}, \${f1Y} \${f2X}, \${f2Y} \${endX}, \${height}\`;
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
</style>`

export const pieChartCode = 
`
`


export const dropDownCode = 
`<script>

  import { ChevronDown } from '@lucide/svelte';
  import { fly } from 'svelte/transition';

  let expanded = $state(false);
  let { selected = $bindable(), options, stickLeft, displayFunc = (a) => {return a}, action = (a) => {} } = $props();


  const click = (a) => {
    expanded = true;
    selected = a;
    action(a);
  }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="dropDown"
    onclick={() => {expanded = !expanded}}
  >
    {#if stickLeft }
      <ChevronDown size=16 />
    {/if}
    <p>{displayFunc(selected)}</p>

    {#if !stickLeft }
      <ChevronDown size=16 />
    {/if}

    {#if expanded} 
      
      <div class="dropdownContent" style="{stickLeft ? "left" : "right"}: 0px;"
        transition:fly={{ x: 50, duration: 250 }}
      >
        {#each options as a}
            <div class="choice"
              onclick={() => click(a)}
            >
              <div class="option {selected == a ? "selected" : ""}">
                <p>{displayFunc(a)}</p>
              </div>
            </div>
        {/each}
      </div>

    {/if}

  </div>




<style>

  p {
    font-size: 16px;
    margin: 0px;
    color: var(--text1);
  }

  .option {
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    color: var(--text1);
    transition: background-color .25s ease;
  }

  .selected {
    background-color: var(--bg3);
  }

  .option:hover {
    background-color: var(--bg3);
  }

  .choice {
    cursor: pointer;
    box-sizing: border-box;
  }

  .choice p {
    color: var(--text1);
    transition: color .25s ease;
  }

  .dropDown {
    width: fit-content;
    height: fit-content;
    height: 45px;
    padding: 10px;
    background-color: var(--bg2);
    border-radius: var(--border-radius);
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

  .dropDown:hover {
    background-color: var(--bg3);
  }

  .dropdownContent {
    position: absolute;
    top: calc(100% - 10px);
    background-color: var(--bg2);
    box-sizing: border-box;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    padding: 10px;
    z-index: 100;
    width: fit-content;
    min-width: 150px;
    border: 1px solid var(--bg3);

  }

  .dropdownContent p {
    text-wrap: nowrap;
  }

</style>`

export const barGraphCode = 
`<script>

let { points = $bindable()} = $props();

const getMax = (points) => {
  let max = 0;
  for(let i of points){
    if(i.value > max){
      max = i.value;
    }
  }
  return max;
}

let max = $derived(getMax(points))


</script>

<div class="barMain">

{#each points as p, i}
  <div class="barWrapper">
    <div class="bar" style="height: {(p.value / max) * 80}%;">
      <div class="barHidden {i > (points.length / 2) ? "toLeft" : "toRight"}">
        <p class='title'>{p.name}</p>
        <p>\${p.value}</p>
      </div>
    </div>
  </div>

{/each}

</div>

<style>
  .barMain {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    color: var(--text1);
    box-sizing: border-box;
    gap: 5px;    

  }

  .barMain:hover .bar {
    opacity: 0.5;
  }

  .bar {
    width: 100%;
    margin-top: auto;
    background-color: var(--main3);
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }

  .barWrapper {
    width: 100%;
    display: flex;
    height: 100%;
    cursor: pointer;
    position: relative;
  }

  .barWrapper:hover .bar {
    opacity: 1.0 !important;
  }


  .barWrapper:hover .bar .barHidden {
    visibility: visible !important;
  }

  .barHidden {
    background-color: var(--main1);
    position: absolute;
    visibility: hidden;
    width: fit-content;
    top: -40px;
    padding: 4px 10px 4px 10px;
    font-size: 12px;
    z-index: 10;
    border-radius: 10px;
  }

  .barHidden p {
    text-wrap: nowrap;
  }

  .toRight {
    left: 50%;
  }

  .toLeft {
    right: 50%;
  }


</style>`

export const squiggleCode = 
`<script>
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
        const startX = getRandomInt(width);
        const startY = getRandomInt(height);
        const loops = getRandomInt(4) + 1;
        let output = \`M \${startX}, \${startY} \`
        for(let i = 0; i < loops; i++){
            let x1 = getRandomInt(width);
            let x2 = getRandomInt(width);
            let y1 = getRandomInt(height);
            let y2 = getRandomInt(height);

            output += \`S\${x1}, \${y1} \${x2}, \${y2} \`
        }
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
</style>`

export const windCode = `
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

        let output = \`M \${top ? start : -10 }, \${top ? -10 : start} L\${top ? height + start : height - start}, \${height + 10}\`;
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
</style>`