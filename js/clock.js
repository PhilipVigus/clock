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

  // reset it here after changing these later in the function
  context.strokeStyle = "#000000";
  context.lineWidth = 2;

  // clear the canvas to transparent
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the clock's outer circle
  drawCircle([250, 250], 200, context);

  // draw the centre of the clock
  drawCircle([250, 250], 5, context);

  // draw the outer markers

  // angle for a 60th of a circle in radians
  const angleInc = 2 * Math.PI / 60;

  let startX, startY;
  let endX, endY;

  for (let i = 0; i < 60; i++) {

    // draw longer lines for the 'hour' markers
    if (i % 5 === 0) {
      startX = Math.sin(i * angleInc) * 185;
      startY = Math.cos(i * angleInc) * 185;
    } else {
      startX = Math.sin(i * angleInc) * 195;
      startY = Math.cos(i * angleInc) * 195;
    }

    endX = Math.sin(i * angleInc) * 200;
    endY = Math.cos(i * angleInc) * 200;

    drawLine([250 + startX, 250 + startY], [250 + endX, 250 + endY], context);
  }

  // the hours and minute hands are thicker
  context.lineWidth = 3;

  let seconds = timeNow.getSeconds();
  let minutes = timeNow.getMinutes();

  let hours = 0;

  // conver the hours to 12h format if necessary
  if (timeNow.getHours() > 12) {
    hours = timeNow.getHours() - 12 + (minutes / 60);
  } else {
    hours = timeNow.getHours() + (minutes / 60);
  }


  // draw the hour hand
  endX = Math.sin(-hours * angleInc * 5) * 110;
  endY = Math.cos(-hours * angleInc * 5) * 110;
  drawLine([250, 250], [250 - endX, 250 - endY], context);

  // draw the minute hand
  endX = Math.sin(-minutes * angleInc) * 180;
  endY = Math.cos(-minutes * angleInc) * 180;
  drawLine([250, 250], [250 - endX, 250 - endY], context);

  // draw the second hand
  context.lineWidth = 1;  
  context.strokeStyle = "#FF0000"; // red

  endX = Math.sin(-seconds * angleInc) * 180;
  endY = Math.cos(-seconds * angleInc) * 180;
  drawLine([250, 250], [250 - endX, 250 - endY], context);

}

function drawLine(start, end, context) {
  context.beginPath();
  context.moveTo(Math.round(start[0]), Math.round(start[1]));
  context.lineTo(Math.round(end[0]), Math.round(end[1]));
  context.stroke();
}

function drawCircle(origin, radius, context) {
  context.beginPath();
  context.arc(Math.round(origin[0]), Math.round(origin[1]), radius, 0, 2 * Math.PI);
  context.stroke();
}

function openSettingsTab() {
  alert("open");
}