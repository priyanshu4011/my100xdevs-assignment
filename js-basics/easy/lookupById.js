
const arr = [{ id: 1, name: "A" }, { id: 2, name: "B" }]

const obj = {}

for (let i = 0; i < arr.length; i++) {

  obj[i + 1] = arr[i]

}

console.log(obj)

//output:{ 1: { id:1, name:"A" }, 2: { id:2, name:"B" } }

