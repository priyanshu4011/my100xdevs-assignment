/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

//A Promise is a stateful object to represent the result of an asynchronous operation.

function wait(n) {
  //The promise will eventually call resolve() when the waiting is done
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n * 1000);
  });
  return p; //Returns the Promise so it can be used with .then() or await
}
  
module.exports = wait;
  
//This code defines and exports a function called wait that pauses for n seconds and then resolves a Promise.


//how we can use this 
//1. ".then()"

/*const wait = require("./wait");

wait(2).then(() => {
  console.log("2 seconds passed");
});
 */

//2. async await 

/*const wait = require("./wait");

async function demo() {
  console.log("Start");
  await wait(3);
  console.log("3 seconds later");
}

demo();
 */

