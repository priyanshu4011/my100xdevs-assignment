/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  //A constructor is a setup function that runs automatically when you create an object.
  constructor(result=0) {
    this.result = result
  }

  add(n) {
    return (this.result += n);
  }
  subtract(n) {
    return (this.result -= n);
  }
  multiply(n) {
    return (this.result *= n);
  }
  divide(n) {
    if (n == 0) {
      throw new Error("Error");
    }
    this.result /= n;
    return this.result;
  }
  clear() {
    return (this.result = 0);
  }
  getResult() {
    return this.result;
  }

  calculate(str) {
    const expr = str.replace(/\s+/g, "");

    // invalid characters
    if (!/^[0-9+\-*/().]+$/.test(expr)) {
      throw new Error("Invalid characters");
    }

    let value;
    try {
      value = Function(`"use strict"; return (${expr})`)();
      //Function(...)() => to execute it immediately
      // "use strict" -> disallows unsafe js , prevents silent errors , blocks access to glocal variables

      /* this creates a fxn like:function () {
         "use strict";
         return (10+2*(6-3));} */
    } catch (err) {
      throw new Error("Invalid expression");
    }

    // division by zero detection
    if (!isFinite(value)) {
      throw new Error("Division by zero");
    }

    this.result = value;
    return this.result;
  }
}

//Function constructor ->  It’s a built-in JavaScript constructor that creates a real function from a string.

module.exports = Calculator;
