/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  let p = new Promise((resolve) => {
    const start = Date.now();

    while (Date.now() - start < milliseconds) {
      //do nothing (busy wait)-> to block the thread
    }

    resolve();
  });

  return p;
}

module.exports = sleep;

//my logic :

// we have to block the js main thread ,for exactly milliseconds time and nothing should run during this time => we will use a while loop (Date.now() - start < milliseconds) , where start = Date.now() {our start time of the program}
