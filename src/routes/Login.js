import classes from "./Login.module.css"
import { useState } from "react"
// import { auth, googleProvider } from "../firebase/firebase-config"
// import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Login() {
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate = useNavigate()
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({email, password})
    })
      console.log(response)
      let responseData = await response.json()
      console.log(responseData)
      //await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      navigate("/")
    } catch(err) {
      alert(err.message)
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className={classes.login}>
      <form className={classes["login-form"]} onSubmit={handleLogin}>
        <div className={classes["form-item"]}>
          <label htmlFor="email">Email:</label>
          <br />
          <input id="email" type="email" value={email} onChange={handleEmail} required></input>
        </div>
        <div className={classes["form-item"]}>
          <label htmlFor="password">Password:</label>
          <br />
          <input id="password" type="password" value={password} onChange={handlePassword} required></input>
        </div>
        <div>
          <Button addClass="button">Log in</Button>
        </div>
      </form>
    </div>
  )
}

export default Login