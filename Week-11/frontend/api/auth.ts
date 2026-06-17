import { BACKEND_URL } from "../config/constants"

export interface SignupPayload {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SigninPayload {
  username: string;
  password: string;
}

export const signupUser = async (data: SignupPayload) => {
  const res = await fetch(`${BACKEND_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const json = await res.json()

  return json
}

export const signinUser = async (data: SigninPayload) => {
  const res = await fetch(`${BACKEND_URL}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const json = res.json()

  return json
}

