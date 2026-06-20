const arr = ["apple", "banana", "apple", "orange", "banana", "apple"]

const obj = {}

for (let i = 0; i < arr.length; i++) {

  if (Object.keys(obj).includes(arr[i])) {

    obj[arr[i]]++

  } else {

    obj[arr[i]] = 1

  }
}

//other way:

//for (let i=0 ;i<arr.length ;i++){
// const fruit = arr[i]
//
// if(obj[fruit]){
//  obj[fruit]++
// }else{
//  obj[fruit] = 1 
// }
//}

console.log(obj)

//output :
//{ apple: 3, banana: 2, orange: 1 }



