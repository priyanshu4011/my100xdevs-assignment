const arr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]

const obj = {}

for (let i = 0; i < arr.length; i++) {
  const id = arr[i].id
  const name = arr[i].name

  obj[id] = name
}

console.log(obj)

//output:{ 1: "Alice", 2: "Bob" }
