// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

const fs = require("fs");

fs.readFile("./file/read.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("FILE CONTENT:");
  console.log(data);
});

//expensive operation here

let sum = 0;
for (let i = 0; i < 1e9; i++) {
  sum += i;
}

console.log("Expensive operation done");

//Async tasks wait for the call stack to be free
//Heavy synchronous code blocks async callbacks
//Event loop only runs callbacks when the stack is empty

//expensive loop blocks the main thread, so the readFile callback cannot run until the loop finishes.