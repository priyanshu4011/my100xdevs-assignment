const obj = { fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }

const arr = Object.values(obj)

const final = []

arr.forEach((e) => {
  for (let i = 0; i < e.length; i++) {
    final.push(e[i])
  }
})

//alt: console.log(Object.values(obj).flat())

console.log(final)

//ouput:

//["apple", "banana", "carrot", "pea"]

