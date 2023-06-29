import classes from "./Home.module.css"
import { useContext } from "react"
import { AppContext } from "../state/context"
import Form from "../components/Form"
import VacationRental from "../components/VacationRental"
import ShoppingCart from "../components/ShoppingCart"

function Home() {
  let contextData = useContext(AppContext)
  let resultVacationRental = contextData.bnbs.map(item => <VacationRental 
    key={item._id} 
    bnb={item} 
    manageCart={contextData.handleAddToCart} 
    deleteBnb={contextData.handleDelete} 
    action="Add to Cart" 
    showDelete={true}
  />)
  return (
    <div className={classes.container}>
      {contextData.isShoppingCartDisplayed && <div className={classes.backdrop} />}
      {contextData.currentUser?.userEmail && <Form />}
      {contextData.currentUser?.userEmail && <h3>User logged in: {contextData.currentUser?.userEmail}</h3>}
      <div className={classes["grid-container"]}>
        {resultVacationRental}
      </div>
      {contextData.isShoppingCartDisplayed && 
      <div className={classes.modal}>
        <ShoppingCart />
      </div>}
    </div>
  );
}

export default Home