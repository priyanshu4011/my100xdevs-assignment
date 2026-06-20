const obj = { food: [10, 20, 30], travel: [5, 15], bills: [40, 60] }

for (let key in obj) {
  let sum = 0
  const arr = obj[key]

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }

  obj[key] = sum
}

console.log(obj)

//ouput
//{ food: 60, travel: 20, bills: 100 }

