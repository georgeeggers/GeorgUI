<script>
let { points = $bindable()} = $props();

const getMax = (points) => {
  let max = 0;
  for(let i of points){
    if(i.value > max){
      max = i.value;
    }
  }
  return Math.ceil(max);
}

const formatNumber = (number) => {
  let suffix = 0;
  while(number >= 1000){
    number /= 1000;
    suffix++;
  }
  const suffixes = ["", "K", "M", "B", "T", "Q", "Qu", "Sx", "Sp", "Oc", "No"]
  return `${number}${suffixes[suffix]}`
}

const getStep = (max) => {
  // goodness gracious...
  let digits = 0;
  while(max >= 10){
    max /= 10;
    digits++;
  }
  max *= 10;
  let second = max % 10;
  second -= second % 2;
  second += 2;
  max = Math.floor(max / 10);
  max *= Math.pow(10, digits);
  max += second * Math.pow(10, digits - 1);

  return (max) / 4
}

let max = $derived(getMax(points))
let step = $derived(getStep(max))
</script>

<div class="barMain">

  <div class="sideLabel">
    <div class="spacer" style='height: 4px'></div>
    {#each {length: 4 } as _, i}
      <p>{formatNumber(Math.round(step * (i + 1)))}</p>
    {/each}
  </div>

  <div class="barContainer">

    <div class="bars">
      <div class="lines">
        {#each {length: 4 } as _, i}
          <div class="line"></div>
        {/each}
        <div class="line" style='opacity: 0.0;'></div>

      </div>
      {#each points as p, i}
        <div class="barWrapper">
          <div class="bar" style="height: calc({(p.value / (step * 4)) * 100}%);">
            <div class="barHidden {i > (points.length / 2) ? "toLeft" : "toRight"}">
              <p class='title'>{p.name}</p>
              <p>{p.value}</p>
            </div>
          </div>

        </div>
      {/each}

    </div>

    <div class="labels">
        {#each points as p, i}
          <p>{p.name}</p>
        {/each}

    </div>

  </div>

</div>

<style>

  .labels {
    width: 100%;
    height: 20px;
    max-height: 20px;
    display: flex;
  }

  .labels p {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .line {
    width: 100%;
    border-bottom: 1px solid var(--text1);
    opacity: 0.5;
    z-index: 0;
  }

  .lines {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 20px;
    position: absolute;
  }

  p {
    color: var(--text1);
  }

  .sideLabel {
    width: fit-content;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: 20px;
    line-height: 16px;
  }

  .barMain {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    color: var(--text1);
    box-sizing: border-box;
    flex-direction: row;
    gap: 5px;    
  }

  .barContainer {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }

  .bars {
    width: 100%;
    height: calc(100% - 20px);
    display: flex;
    position: relative;
    color: var(--text1);
    box-sizing: border-box;
    gap: 5px;
  }

  .bar {
    width: 100%;
    margin-top: auto;
    background-color: var(--main3);
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    opacity: 0.8;
    z-index: 1;
  }

  .barWrapper {
    width: 100%;
    display: flex;
    height: 100%;
    cursor: pointer;
    position: relative;
    flex-direction: column;
    align-items: center;
  }

  .barWrapper:hover * {
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