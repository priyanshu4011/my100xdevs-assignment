
const obj = { a: [1, [2, [3]]], b: [4, [5]] }

for (const key in obj) {
  obj[key] = obj[key].flat(Infinity)
}

//.flat(infinity) is a built in way to flatten nested arrays 

console.log(obj)

//output:{ a: [1,2,3], b: [4,5] }

