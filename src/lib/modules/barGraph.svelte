<script>

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
        <p>${p.value}</p>
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


</style>