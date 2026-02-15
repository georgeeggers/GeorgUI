<script>
const points = $state([
  1, 3, 1, 2
]);

const degToRad = (deg) => {
  return (deg / 180) * Math.PI;
}

const calculatePoints = (angle) => {
  let p1 = Math.sin(-degToRad(angle) + degToRad(90));
  let p2 = Math.cos(-degToRad(angle) + degToRad(90));
  return {
    x: (p2 * 50) + 50,
    y: 100 - ((p1 * 50) + 50),
    quad: Math.floor((angle - 0.000001) / 90)
  }
}


const getClip = (percentage) => {
  let data = calculatePoints(360 * percentage);
  let output = "50% 50%, 50% 0%";

  let done = false;

  if(data.quad == 0){
    for(let i = 0; i < 4; i++){
      output += `, ${data.x}% 0`;
    }
    done = true;
  } else {
    output += ", 100% 0"
  }

  if(data.quad >= 1){
    if(data.quad == 1){
      for(let i = 0; i < 3; i++){
        output += `, 100% ${data.y}%`;
      }
      done = true;
    } else {
      output += ", 100% 100%"
    }
  }
 
  if(data.quad >= 2){
    if(data.quad == 2 && !done){
      for(let i = 0; i < 2; i++){
        output += `, ${data.x}% 100%`;
      }
      done = true;
    } else {
      output += ", 0 100%"
    }
  }

  if(data.quad >= 3){
    if(data.quad == 3 && !done){
      output += `, 0 ${data.y}%`;
      done = true;
    } else {
      output += ", 0 0"
    }
  }

  output += `, ${data.x}% ${data.y}%`
  return `clip-path: polygon(${output});`;
}

const getCss = (points, index) => {
  let total = sum(points);
  let percentage = (points[index] / total);
  let css = getClip(percentage);
  let angle = 0;
  for(let i = 0; i < index; i++){
    let percentage = points[i] / total;
    angle += 360 * percentage;
  }
  return `${css} background-color: var(--main${index + 1}); rotate: ${angle}deg;`

}

const sum = (points) => {
  let total = 0;
  for(let i of points){
    total += i;
  }

  return total;
}

</script>

<div class="main">
  <div class="container">
    {#each points as _, i}
      <div class="box" style="{getCss(points, i)}">
      </div>
    {/each}
  </div>
</div>

<style>

  .container {
    position: relative;
    box-sizing: border-box;
    clip-path: circle(50% at 50% 50%);

    aspect-ratio: 1;
    width: 100%;
    height: 100%;


  }

  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
  }

  .box:hover {
    opacity: 1.0 !important;
  }

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    color: var(--text1);
    padding: 20px;
    box-sizing: border-box;
  }

  .main:hover .box {
    opacity: 0.5;
  }

</style>