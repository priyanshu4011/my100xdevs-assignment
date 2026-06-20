const obj = { a: 1, b: "hello", c: 3 }

for (const key in obj) {
  if (isNaN(obj[key])) {
    console.log("false")
  }
}

//output:false
