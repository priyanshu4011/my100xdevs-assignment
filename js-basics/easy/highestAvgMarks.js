const obj = { A: [80, 90], B: [70, 75, 85] }

const keys = Object.keys(obj)

let largestKey = keys[0]

let firstMarks = obj[largestKey]
let sum = 0

for (let i = 0; i < firstMarks.length; i++) {
  sum += firstMarks[i]
}

let largestAvg = sum / firstMarks.length

for (let i = 1; i < keys.length; i++) {
  const key = keys[i]
  const marks = obj[key]

  let sum = 0
  for (let j = 0; j < marks.length; j++) {
    sum += marks[j]
  }

  const avg = sum / marks.length

  if (avg > largestAvg) {
    largestAvg = avg
    largestKey = key
  }
}

console.log(largestKey)
