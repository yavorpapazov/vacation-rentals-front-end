import classes from "./Navigation.module.css"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../state/context"
import { AiOutlineShoppingCart } from "react-icons/ai"
import LinkButton from "./LinkButton"
import Button from "./Button"

function Navigation() {
  let contextData = useContext(AppContext)
  let navigate = useNavigate()
  function handleLogout() {
    try {
      contextData.handleUserLogout()
    } catch(err) {
      console.log(err.message)
    }
    navigate("/")
  }
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <div>
          <LinkButton to="/">Home</LinkButton>
        </div>
        <div className={classes["auth-cart"]}>
          <div className={classes["shopping-cart-log-in"]}>
            <div className={classes["shopping-cart"]} onClick={() => contextData.handleDisplayCart()}>
              <h3 className={classes["shopping-cart-h3"]}>{!contextData.currentUser?.userEmail ? 0 : contextData.cart.length}</h3>
              <div>
                <AiOutlineShoppingCart size="2em" />
              </div>
            </div>
            {!contextData.currentUser?.userEmail && <div>
              <LinkButton addClass="border" to="/login">Log In</LinkButton>
            </div>}
            {contextData.currentUser?.userEmail && <div>
              <Button addClass="btn" onClick={handleLogout}>Log out</Button>
            </div>}
          </div>
          {!contextData.currentUser?.userEmail && <div>
            <LinkButton addClass="border" to="/register">Register</LinkButton>
          </div>}
        </div>
      </nav>
    </header>
  )
}

export default Navigation