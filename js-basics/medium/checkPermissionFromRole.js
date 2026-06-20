const roles = {
  admin: ["read", "write"], user: ["read"],
  staff: ["write"]
}
const checkRole = "user"
const action = "write"

for (const key in roles) {
  if (key === checkRole && !roles[key].includes(action)) {
    console.log(false)
  }
}

//output:false
