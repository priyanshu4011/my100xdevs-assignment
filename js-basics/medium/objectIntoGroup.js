const obj = { a: 1, b: 2, c: 3, d: 4 }
const size = 2

const entries = Object.entries(obj)
const result = []

for (let i = 0; i < entries.length; i += size) {
  result.push(entries.slice(i, i + size))
}

console.log(result)

//output:[ [["a",1],["b",2]], [["c",3],["d",4]] ]
