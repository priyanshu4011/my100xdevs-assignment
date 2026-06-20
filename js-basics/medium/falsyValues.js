
const obj = { a: 0, b: null, c: "hello", d: undefined, e: 5 }


const newObj = {}

const keys = Object.keys(obj)

for (let i = 0; i < keys.length; i++) {
  if (obj[keys[i]]) {
    newObj[keys[i]] = obj[keys[i]]
  }
}

console.log(newObj)
//output:{ c: "hello", e: 5 }

