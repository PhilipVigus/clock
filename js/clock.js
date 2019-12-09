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
  const timeString = `${formatTimeComponent(timeNow.getHours())}:${formatTimeComponent(timeNow.getMinutes())}:${formatTimeComponent(timeNow.getSeconds())}`;
  const dateString = `${timeNow.getDate()}-${timeNow.getMonth() + 1}-${timeNow.getFullYear()}`;
  document.getElementById("clock-digital").innerHTML = dateString + "\n" + timeString;
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

  context.lineWidth = 2;

  // draw the clock's outer circle
  drawCircle([250, 250], 200, context);

  // draw the centre of the clock
  drawCircle([250, 250], 5, context);

  // draw the outer markers
  const angleInc = 2 * Math.PI / 60;
  let startX, startY;
  let endX, endY;

  for (let i = 0; i < 60; i++) {
    startX = Math.sin(i * angleInc) * 190;
    startY = Math.cos(i * angleInc) * 190;
    endX = Math.sin(i * angleInc) * 200;
    endY = Math.cos(i * angleInc) * 200;

    drawLine([250 + startX, 250 + startY], [250 + endX, 250 + endY], context);
  }

  /* // draw the hour hand
  let hours = 0;
  if (timeNow.getHours() > 12) {
    hours = timeNow.getHours() - 12;
  } else {
    hours = timeNow.getHours();
  }
  hours = 24;
  endX = Math.sin(hours * angleInc) * 200;
  endY = Math.cos(hours * angleInc) * 200;
  drawLine([250, 250], [250 + endX, 250 + endY], context); */


}

function drawLine(start, end, context) {
  context.beginPath();
  context.moveTo(start[0], start[1]);
  context.lineTo(end[0], end[1]);
  context.stroke();
}

function drawCircle(origin, radius, context) {
  context.beginPath();
  context.arc(origin[0], origin[1], radius, 0, 2 * Math.PI);
  context.stroke();
}