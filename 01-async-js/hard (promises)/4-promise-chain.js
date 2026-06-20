/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
  return p;
}

function wait2(t) {
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
  return p;
}

function wait3(t) {
  let p = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
  return p;
}

function calculateTime(t1, t2, t3) {
//we need to call the fxns one by one , therefore we will not do wait1(t1) ; wait2(t2) -> as this will call the functions at the same time
const start = Date.now();

return wait1(t1)
  .then(() => wait2(t2))
  .then(() => wait3(t3))
  .then(() => {
    const end = Date.now();
    return end - start;
  });
}

// wait2 starts only after wait1 finishes
// returning a promise from .then() : pauses the chain and waits for that promise to resolve (sequential async flow)

// For sequential execution → chain promises using .then(),
// returning each promise so the next waits for the previous

module.exports = calculateTime;
