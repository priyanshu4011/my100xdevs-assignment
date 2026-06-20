
const obj = { x: [1, 2, 3], y: [2, 3, 4], z: [4, 5] }

const arr = Object.values(obj)

const result = []

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (!result.includes(arr[i][j]))
      result.push(arr[i][j])
  }
}

//another way :
//const result = [...new Set(Object.values(obj).flat())]

console.log(result)

//output:[1,2,3,4,5]

