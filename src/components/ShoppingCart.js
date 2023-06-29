import classes from "./ShoppingCart.module.css"
import { useContext } from "react"
import { AppContext } from "../state/context"
import VacationRental from "./VacationRental"
import Button from "../ui/Button"

function ShoppingCart() {
  let contextData = useContext(AppContext)
  let total = 0
  let resultShoppingCartItems = contextData.cart.map(item => <VacationRental 
    key={item._id} 
    bnb={item} 
    manageCart={contextData.handleRemoveFromCart} 
    action="Remove"
    showDelete={false}
  />)
  for(let i of contextData.cart) {
    total = total + i.bnbCost
  }
  return (
    <div className={classes["grid-container"]}>
      {resultShoppingCartItems}
      <h3>Total: ${total}</h3>
      <div>
        <Button addClass="button" onClick={contextData.handleCloseCart}>Close</Button>
      </div>
    </div>
  )
}

export default ShoppingCart