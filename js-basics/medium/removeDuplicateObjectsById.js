
const arr = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
]

//A Map stores key → value pairs.

const result = [...new Map(arr.map(item => [item.id, item])).values()]


console.log(result)

//ouput:[
//   { id: 1, name: "A" },
//   { id: 2, name: "B" }
// ]

