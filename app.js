// const logo =document.querySelectorAll("#desktop-background path");

// const logoLines = document.querySelectorAll("#desktop-background line");

// for(let i = 0; i < logo.length; i++){
//   console.log(`strand ${i} is ${logo[i].getTotalLength()}`);
// }

// for(let i = 0; i < logoLines.length; i++){
//   console.log(`line ${i} is ${logoLines[i].getTotalLength()}`);
// }

console.log(document.getElementById("desktop-background").getBoundingClientRect());

//Global Variables
let svgBaseWidth = 1298;
let svgBaseHeight = 991;
let background = document.getElementById("desktop-background").getBoundingClientRect();
let svgScaleWidth = background.width/svgBaseWidth;
let svgScaleHeight = background.height/svgBaseHeight;

function rescaleElement(elementId, top, left){
  let element = document.getElementById(elementId);
  const abs_top = background.top + window.scrollY + top*svgScaleHeight;
  const abs_left = background.left + window.scrollX + left*svgScaleWidth;
  element.style.top = abs_top.toString()+'px';
  element.style.left = abs_left.toString()+'px';
}

function rescaleUI(){ //Warning!! This is going to get hacky
  rescaleElement("projects", 200, 180);
  rescaleElement("resume", 200, 1115);
  rescaleElement("research", 800, 180);
  rescaleElement("contacts", 800, 1115);
}

window.onresize = function(){
  //location.reload();
  svgBaseWidth = 1298;
  svgBaseHeight = 991;
  background = document.getElementById("desktop-background").getBoundingClientRect();
  svgScaleWidth = background.width/svgBaseWidth;
  svgScaleHeight = background.height/svgBaseHeight;
  rescaleUI();
};

rescaleUI();