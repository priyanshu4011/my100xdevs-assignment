const obj = { a: [1, 2, 3], b: [2, 3, 4], c: [3, 4, 5] }

const arrays = Object.values(obj)

const result = arrays.reduce((acc, curr) =>
  acc.filter(num => curr.includes(num))
)

console.log(result)

//output: [3]
