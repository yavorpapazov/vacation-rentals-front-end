import classes from "./Login.module.css"
import { useContext, useState } from "react"
import { AppContext } from "../state/context"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Login() {
  let contextData = useContext(AppContext)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let navigate = useNavigate()
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  function handleLogin(e) {
    e.preventDefault()
    try {
      contextData.handleUserLogin(email, password)
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