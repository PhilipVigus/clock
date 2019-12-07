'use strict';

displayCurrentTime();

function displayCurrentTime() {

  // we need to create a new Date every time this is called so it contains the time now
  let time = new Date();

  // set the html text to the current time
  document.getElementById("clock").innerHTML = `Current time = ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  // set a timer for the next call to this function
  setTimeout(displayCurrentTime, 500);
}