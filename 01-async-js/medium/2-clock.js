// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let hours = new Date().getHours();
let mins = new Date().getMinutes();
let secs = new Date().getSeconds();
let meridiem = hours >= 12 ? "PM" : "AM";

//console.log(hours)
function Timer() {
  secs++;

  if (secs === 60) {
    secs = 0;
    mins++;
  }

  if (mins === 60) {
    mins = 0;
    hours++;
  }

  if (hours === 24) {
    hours = 0;
  }
  console.log(`${hours}:${mins}:${secs} ${meridiem}`);
}

setInterval(Timer, 1000);
