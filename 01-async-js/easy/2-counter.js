// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let count = 0;

function counter() {
  count++;
  console.log(count);
  setTimeout(counter, 1000);
}

counter();

//If you want it to start after 1 second, do this instead:
// setTimeout(counter, 1000);


//difference between setInterval and setTimeout

//setTimeout -> Runs a function once after a specified delay.
//to do repeated work we must manually schedule it

//setInterval -> Runs a function repeatedly at fixed time intervals.Runs automatically after the time gap
