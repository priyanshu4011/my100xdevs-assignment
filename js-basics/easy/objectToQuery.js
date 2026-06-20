const obj = { name: "Alice", age: 25 }

const key = Object.keys(obj)

for (let i = 0; i < key.length - 1; i++) {
  console.log(`${key[i]}=${obj[key[i]]}&${key[i + 1]}=${obj[key[i + 1]]}`)
}
