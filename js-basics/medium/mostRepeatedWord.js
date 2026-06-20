
const obj = { fruits: ["apple", "apple", "banana"], drinks: ["apple", "tea"] }

const arr = Object.values(obj).flat()

const result = arr.find((item, index) => arr.indexOf(item) !== index)

console.log(result)

//output:apple

