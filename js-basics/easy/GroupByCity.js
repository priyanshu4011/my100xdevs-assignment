
const arr = [
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
]

let obj = {}
// let delhi =[]
// let mumbai = []

for (let i = 0; i < arr.length; i++) {
  const key = arr[i].city
  const value = arr[i].name

  // if(key === "Delhi"){
  //     delhi.push(value)
  //     obj[key] = delhi
  // }

  // if(key === "Mumbai"){
  //     mumbai.push(value)
  //     obj[key] = mumbai
  // }

  if (!obj[key]) {
    obj[key] = []
  }

  obj[key].push(value)


}

console.log(obj)
//{ Delhi: ["A", "C"], Mumbai: ["B"] }
