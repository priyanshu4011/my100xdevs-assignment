const obj = { a: "apple", b: "banana", c: "kiwi" }


const value = Object.values(obj)

let max = value[0].length

for (let i = 0; i < value.length; i++) {
  if (value[i].length > max) {
    max = value[i]

    console.log(max)
  }

}

//output: banana
