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

            <button class='shake btn3'>
                Hover Me!
            </button>

        </div>

        <div class="card bb2" style='grid-area: box-4'>
            <div class="title">
                <p>Buttons</p>
            </div>

            <button class='btn1'>
                btn1
            </button>
            <button class='btn2'>
                btn2
            </button>
            <button class='btn3'>
                btn3
            </button>
            <button class='btnM'>
                btnM
            </button>
            <button class='btnF'>
                btnF
            </button>
        </div>

        <div class="card bb2" style='grid-area: box-5'>
            <div class="title">
                <p>Wiggle</p>
            </div>

            <button class='wiggle btn3'>
                Hover Me!
            </button>

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



</style>