
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { signinUser } from "../../api/auth.ts"
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const { mutate: signinMutation } = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      const token = data.token

      localStorage.setItem("token", token)
      navigate("/home")
    },
    onError: (error) => {
      console.error(error)
      alert("Registration failed")
    },
  })
  function signin() {
    const username = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !password) {
      alert("All fields are required")
      return
    }
    signinMutation({ username, password })

  }
  return (
    <div>
      <input placeholder="test@gmail.com" ref={emailRef} />
      <input placeholder="******" ref={passwordRef} />
      <button onClick={signin}>Signin</button>
    </div>
  )
}

