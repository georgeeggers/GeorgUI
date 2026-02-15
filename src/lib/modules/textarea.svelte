<script>
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
</style>
