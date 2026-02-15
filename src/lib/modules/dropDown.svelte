<script>

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

</style>