import classes from "./Register.module.css"
import { useContext, useState } from "react"
import { AppContext } from "../state/context"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

function Register() {
  let contextData = useContext(AppContext)
  let [registerEmail, setRegisterEmail] = useState('')
  let [registerPassword, setRegisterPassword] = useState('')
  let navigate = useNavigate()
  function handleRegisterEmail(e) {
    setRegisterEmail(e.target.value)
  }
  function handleRegisterPassword(e) {
    setRegisterPassword(e.target.value)
  }
  async function handleRegister(e) {
    e.preventDefault()
    try {
      contextData.handleUserRegister(registerEmail, registerPassword)
      setRegisterEmail('')
      setRegisterPassword('')
      navigate("/")
    } catch(err) {
      alert(err.message)
      setRegisterEmail('')
      setRegisterPassword('')
    }
  }
  return (
    <div className={classes.register}>
      <form className={classes["register-form"]} onSubmit={handleRegister}>
        <div className={classes["form-item"]}>
          <label htmlFor="registeremail">Email:</label>
          <br />
          <input id="registeremail" type="email" value={registerEmail} onChange={handleRegisterEmail} required></input>
        </div>
        <div className={classes["form-item"]}>
          <label htmlFor="registerpassword">Password:</label>
          <br />
          <input id="registerpassword" type="password" value={registerPassword} onChange={handleRegisterPassword} required></input>
        </div>
        <div>
          <Button addClass="button">Sign up</Button>
        </div>
      </form>
    </div>
  )
}

export default Register