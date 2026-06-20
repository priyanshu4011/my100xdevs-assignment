const obj = { name: "alice", city: "delhi" }

function capitalize(string) {
  const first = string.slice(0, 1).toUpperCase()
  const last = string.slice(1)

  //const final = [...first , ...last]
  const final = first + last

  //return final.join("")
  return final
}

for (const key in obj) {
  obj[key] = capitalize(obj[key])
}

console.log(obj)

//output :{ name: 'Alice', city: 'Delhi' }
