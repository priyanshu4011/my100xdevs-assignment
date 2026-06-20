const obj = { a: "x", b: "y", c: "z" }

const newObj = {}
const keys = Object.keys(obj)

for (let i = 0; i < keys.length; i++) {
  let temp = keys[i]
  keys[i] = obj[keys[i]]
  newObj[keys[i]] = temp
}

console.log(newObj)

//ouput:
//{x: 'a' , y , 'b' , z: 'c'}
