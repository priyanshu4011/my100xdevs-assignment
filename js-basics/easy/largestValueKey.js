
const obj = { a: 10, b: 50, c: 20 }

const keys = Object.keys(obj)
let max = obj[keys[0]]

let maxKey = keys[0]

for (let i = 0; i < keys.length; i++) {
  if (obj[keys[i]] > max) {
    max = obj[keys[i]]
    maxKey = keys[i]
  }
}

console.log(maxKey)

//output : b
