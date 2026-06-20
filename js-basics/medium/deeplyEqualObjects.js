const obj1 = { a: { x: 1, y: 2 } }
const obj2 = { a: { x: 1, y: 2 } }

const result = JSON.stringify(obj1) === JSON.stringify(obj2)

console.log(result)

//output: true


