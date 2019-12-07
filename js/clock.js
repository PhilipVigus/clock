'use strict';

let clockEle = document.getElementById("clock");
const time = new Date();
clockEle.innerHTML = `Current time = ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
