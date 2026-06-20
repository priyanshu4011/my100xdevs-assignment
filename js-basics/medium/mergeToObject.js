
const obj1 = { a: 10, b: 20 }
const obj2 = { a: 5, c: 15 }

console.log({ ...obj1, ...obj2 })

//output:{ a: 5, b: 20, c: 15 }

