const arr = [1, 2, 3, 4, 5, 6]

const obj = { even: 0, odd: 0 }

for (let i = 0; i < arr.length; i++) {

  if (arr[i] % 2 === 0) {

    obj["even"]++
  } else {

    obj["odd"]++
  }
}

console.log(obj)

//output : {even:3 , odd:3}
