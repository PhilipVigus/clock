'use strict';

displayCurrentTime();

function displayCurrentTime() {

  // we need to create a new Date every time this is called so it contains the time now
  let time = new Date();

  // update the digital time
  updateDigitalDisplay(time);

  // update the analogue time
  updateAnalogueDisplay(time);  

  // set a timer for the next call to this function
  setTimeout(displayCurrentTime, 500);
}

function updateDigitalDisplay(timeNow) {
  document.getElementById("clock-digital").innerHTML = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;
}

function updateAnalogueDisplay(timeNow) {

  let canvas = document.getElementById("clock-analogue");

  // check to see if canvas is supported. If not then do something funky
  if (!canvas.getContext("2d")) {
    alert("Canvas is not supported on this device - sorry!");
    return;
  }
}