
const obj = { a: { b: { c: 1, d: 2 } } }
const remove = "c"

function removeKey(object, key) {
  for (const k in object) {
    if (k === key) {
      delete object[k]
    } else if (typeof object[k] === "object") {
      removeKey(object[k], key)
    }
  }
}

removeKey(obj, remove)

//other way: delete obj.a.b[remove]

console.log(obj)

//output:{ a: { b: { d: 2 } } }

