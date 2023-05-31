import classes from "./Navigation.module.css"
// import { useContext, useState, useEffect } from "react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../state/context"
// import { auth } from "../firebase/firebase-config"
// import { onAuthStateChanged, signOut } from "firebase/auth"
import { AiOutlineShoppingCart } from "react-icons/ai"
import LinkButton from "./LinkButton"
import Button from "./Button"

function Navigation() {
  let contextData = useContext(AppContext)
  let [userId, setUserId] = useState(null)
  let navigate = useNavigate()
  // useEffect(() => {
  //   onAuthStateChanged(auth, currentUser => {
  //     if(currentUser) {
  //       setUserId(currentUser.uid)
  //     } else {
  //       setUserId(null)
  //     }
  //   })
  // }, [])
  function handleLogout() {
    try {
      contextData.handleUserLogout()
    } catch(err) {
      console.log(err.message)
    }
    navigate("/")
  }
  // async function handleLogout() {
  //   try {
  //     await signOut(auth) 
  //   } catch(err) {
  //     console.log(err.message)
  //   }
  //   navigate("/")
  // }
  return (
    <header className={classes.header}>
      <div>Navigation</div>
      <nav className={classes.navbar}>
        <div>
          <LinkButton to="/">Home</LinkButton>
        </div>
        <div className={classes["auth-cart"]}>
          <div className={classes["shopping-cart-log-in"]}>
            <div className={classes["shopping-cart"]} onClick={() => contextData.handleDisplayCart()}>
              <h3 className={classes["shopping-cart-h3"]}>{userId === null ? 0 : contextData.cart.length}</h3>
              <div>
                <AiOutlineShoppingCart size="2em" />
              </div>
            </div>
            {/* {userId === null && <div> */}
              <LinkButton addClass="border" to="/login">Log In</LinkButton>
            {/* </div>} */}
            {/* {userId !== null && <div> */}
              <Button addClass="btn" onClick={handleLogout}>Log out</Button>
            {/* </div>} */}
          </div>
          {/* {userId === null && <div> */}
            <LinkButton addClass="border" to="/register">Register</LinkButton>
          {/* </div>} */}
        </div>
      </nav>
    </header>
  )
}

export default Navigation