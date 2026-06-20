
const obj = { name: "Rahul", age: 23, city: "Noida" }
const arr = ["name", "city"]

const newObj = {}

for (const key in obj) {
  for (let i = 0; i < arr.length; i++) {
    if (key === arr[i]) {
      newObj[key] = obj[key]
    }
  }
}

console.log(newObj)

//output:{ name: "Rahul", city: "Noida" }


