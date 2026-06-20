/*
  Write a function `reve` which takes a string as input and returns the reversed version of the string.

  What is reversing a string?
  - Reversing a string means rearranging its characters in the opposite order.

  Example:
  - Input: "Sumana"
  - Output: "anamuS"

  - Input: "hello"
  - Output: "olleh"

  - Input: ""
  - Output: ""

  Once you've implemented the logic, test your code by running
  - `npm run test-reverseString`
*/

function reverseString(str) {
  let arr = str.split(""); // string -> array
  let l = 0;
  let r = arr.length - 1;

  while (l <= r) {
    let temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;

    l++;
    r--;
  }

  return arr.join(""); //array -> string

  //alt solution :

  //return str.split("").reverse().join("")
}

//strings are immutable so swapping won't work ever

//.split() breaks a string into an array based on a separator.
//eg: "hello" -> ["h", "e", "l", "l", "o"] {if .split("")}

//.join() joins array elements into a string.

module.exports = reverseString;
