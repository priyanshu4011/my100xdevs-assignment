
const obj1 = { a: { x: 1, y: 2 } }
const obj2 = { a: { y: 3, z: 4 } }

const result = {
  ...obj1,
  a: {
    ...obj1.a,
    ...obj2.a
  }
}

console.log(result)

//output:{ a: { x: 1, y: 3, z: 4 } }

