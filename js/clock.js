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
  document.getElementById("clock-digital").innerHTML = `${formatTimeComponent(timeNow.getHours())}:${formatTimeComponent(timeNow.getMinutes())}:${formatTimeComponent(timeNow.getSeconds())}`;
}

function formatTimeComponent(component) {
  return component > 9 ? component.toString(10) : '0' + component.toString(10);
}

function updateAnalogueDisplay(timeNow) {

  let canvas = document.getElementById("clock-analogue");
  let context = canvas.getContext("2d");

  // check to see if canvas is supported. If not then do something else instead and return
  if (!context) {
    alert("Canvas is not supported on this device - sorry!");
    return;
  }

  context.fillStyle = 'rgb(200, 0, 0)';
  context.fillRect(10, 10, 50, 50);

}