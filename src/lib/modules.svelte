<script>
    import BarGraph from "./modules/barGraph.svelte";
    import DropDown from "./modules/dropDown.svelte";
    import PieChart from "./modules/pieChart.svelte";
    import SvgAnimation from "./modules/svgAnimation.svelte";
    import Textarea from "./modules/textarea.svelte";
    import Toggle from "./modules/toggle.svelte";

    let toggle = $state(false);
    let toggle2 = $state(false);

    let selected = $state("Option 1");
    let selected2 = $state("Option 2");
    let selected3 = $state("Option 3");

    let points = $state([
        {
            name: "Item 1",
            value: 100
        },
        {
            name: "Item 2",
            value: 71
        },
        {
            name: "Item 3",
            value: 26
        }
    ]);

    let text = $state("");



</script>

<div class="uiMain">

    <div class="gridBox">

        <div class="card bb2" style='grid-area: box-1;'>
            <div class="title">
                <p>Toggle</p>
            </div>
            <p>Simple Toggle</p>
            <Toggle bind:value={toggle}/>
            <p>Actioned Toggle</p>
            <Toggle bind:value={toggle2} action={() => {alert("This toggle has an action!")}}/>
        </div>

        <div class="card bb2" style='grid-area: box-2;'>
            <div class="title">
                <p>DropDown</p>
            </div>
            <p>Right Dropdown</p>
            <DropDown bind:selected={selected} options={["Option 1", "Option 2", "Option 3"]} stickLeft={false}/>
            <p>Left Dropdown</p>
            <DropDown bind:selected={selected2} options={["Option 1", "Option 2", "Option 3"]} stickLeft={true}/>
            <p>Actioned Dropdown</p>
            <DropDown bind:selected={selected3} options={["Option 1", "Option 2", "Option 3"]} stickLeft={false} action={(a) => {alert("You selected " + a)}}/>
        </div>

        <div class="card bb2" style='grid-area: box-3;'>
            <div class="title">
                <p>Bar Graph</p>
            </div>
            <div class="wrapper">
                <BarGraph bind:points={points}/>
            </div>
        </div>

        <div class="card bb2" style='grid-area: box-4;'>
            <div class="title">
                <p>Splash Animation</p>
            </div>
            <div class="wrapper">
                <SvgAnimation />
            </div>
        </div>

        <div class="card bb2" style='grid-area: box-5;'>
            <div class="title">
                <p>Pie Chart</p>
            </div>
            <div class="wrapper">
                <PieChart />
            </div>
        </div>

        <div class="card bb2" style='grid-area: box-6;'>
            <div class="title">
                <p>Text Area</p>
            </div>
            <div class="wrapper">
                <Textarea bind:value={text} />
            </div>
        </div>

    </div>


</div>


<style>

    .gridBox {

        display: grid;

        margin-left: auto;
        margin-right: auto;
        grid-auto-columns: 100px;
        grid-auto-rows: 100px;
        grid-template-areas: 
        "box-1 box-1 box-3 box-3 box-3 box-3"
        "box-1 box-1 box-3 box-3 box-3 box-3"
        "box-2 box-2 box-3 box-3 box-3 box-3"
        "box-2 box-2 box-4 box-4 box-4 box-4"
        "box-2 box-2 box-4 box-4 box-4 box-4"
        "box-5 box-5 box-4 box-4 box-4 box-4"
        "box-5 box-5 box-4 box-4 box-4 box-4"
        "box-6 box-6 box-6 box-6 .     .    "
        "box-6 box-6 box-6 box-6 .     .    "
        "box-6 box-6 box-6 box-6 .     .    "
        ;
        box-sizing: border-box;
        gap: 1em;
    }


    .wrapper {
        width: 100%;
        height: 100%;
    }

    .title {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
</style>