
const arr = [
  { id: 1, category: "fruit" },
  { id: 2, category: "veggie" },
  { id: 3, category: "fruit" }
]

const obj = {}

for (let i = 0; i < arr.length; i++) {
  const key = arr[i].category

  if (!obj[key]) {
    obj[key] = []
  }
  obj[key].push(arr[i].id)


}

console.log(obj)

//output :{ fruit: [1,3], veggie: [2] }

