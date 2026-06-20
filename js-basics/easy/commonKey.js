
const obj1 = { a: 1, b: 2, c: 3 }
const obj2 = { b: 4, c: 5, d: 6 }

const arr = []

for (const key1 in obj1) {
  for (const key2 in obj2) {
    if (key1 === key2) {
      arr.push(key1)
    }
  }
}

console.log(arr)

//output:[ 'b', 'c' ]

