import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { signupUser } from "../../api/auth.ts"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const firstnameRef = useRef<HTMLInputElement | null>(null)
  const lastnameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const { mutate: signupMutation } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      navigate("/signin")
    },
    onError: (error) => {
      console.error(error)
      alert("Registration failed")
    },
  })
  function signup() {
    const username = emailRef.current?.value
    const firstName = firstnameRef.current?.value
    const lastName = lastnameRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !firstName || !lastName || !password) {
      alert("All fields are required")
      return
    }
    signupMutation({ username, firstName, lastName, password })

  }
  return (
    <div>
      <input placeholder="test@gmail.com" ref={emailRef} />
      <input placeholder="first name" ref={firstnameRef} />
      <input placeholder="last name" ref={lastnameRef} />
      <input placeholder="******" ref={passwordRef} />
      <button onClick={signup}>Signup</button>
    </div>
  )
}

