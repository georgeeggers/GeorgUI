<script>
    import { replace} from 'svelte-spa-router';
    import { LoaderCircle, PaintBucket } from '@lucide/svelte';

</script>


<div class="uiMain">

    <div class="gridBox">
        <div class="card bb2" style='grid-area: box-1'>
            <div class="title">
                <p>Block Quote</p>
            </div>
            <p class='bq'>This is an example of a block quote</p>
        </div>

        <div class="card bb2" style='grid-area: box-2'>
            <div class="title">
                <p>Loading</p>
            </div>
            <div class="svgWrapper loading">
                <LoaderCircle size=20 />
            </div>
            <p class='loading'>Apply to anything</p>
        </div>

        <div class="card bb2" style='grid-area: box-3'>
            <div class="title">
                <p>Shake</p>
            </div>

            <button class='shake btn bb3'>
                Hover Me!
            </button>

        </div>

        <div class="card bb2" style='grid-area: box-4'>
            <div class="title">
                <p>Buttons</p>
            </div>

            <button class='btn bb1'>
                bb1
            </button>
            <button class='btn bb2'>
                bb2
            </button>
            <button class='btn bb3'>
                bb3
            </button>
            <button class='btn main'>
                main
            </button>
            <button class='btn fail'>
                fail
            </button>
        </div>

        <div class="card bb2" style='grid-area: box-5'>
            <div class="title">
                <p>Wiggle</p>
            </div>

            <button class='wiggle btn bb3'>
                Hover Me!
            </button>
        </div>

        <div class="card bb2" style='grid-area: box-6'>
            <div class="title">
                <p>Badges</p>
            </div>

            <div class="horizontal">
                <p class='bdg bb1'>bb1</p>
                <p class='bdg bb2'>bb2</p>
                <p class='bdg bb3'>bb3</p>
                <p class='bdg main'>main</p>
                <p class='bdg fail'>fail</p>
            </div>



        </div>



    </div>


</div>

<button class="moveButton bb3"
    onclick={() => replace('/')}
>
    <div class="svgWrapper">
        <PaintBucket size=30 />
    </div>
</button>




<style>

    .gridBox {
        display: grid;
        margin-left: auto;
        margin-right: auto;
        grid-auto-columns: 200px;
        grid-auto-rows: 220px;
        grid-template-areas: 
            "box-1 box-2 box-4"
            "box-3 box-5 box-4"
            ".     .     box-6"
        ;
        box-sizing: border-box;
        gap: 1em;
    }
    .card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: left;
        gap: 10px;

    }
    .title {
        font-size: 20px;
        font-weight: bold;
        display: flex;
        width: 100%;
    }

    .btn {
        padding: 10px;
        display: flex;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: background-color .25s;
        font-size: 14px;
    }

    .bdg {
        padding: 2px 5px 2px 5px;
        width: fit-content;
        border-radius: var(--border-radius);
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
    .main {
        background-color: var(--main3);
        border: 1px solid var(--main1);
    }
    .btn.main:hover {
        background-color: var(--main1);
    }
    .btn.fail:hover {
        background-color: var(--fail1);
    }
    .fail {
        background-color: var(--fail3);
        border: 1px solid var(--fail1);
    }

    .horizontal {
        flex-direction: row;
        display: flex;
        box-sizing: border-box;
        gap: 10px;
        flex-wrap: wrap;
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



</style>