import classes from "./LinkButton.module.css"
import { Link } from "react-router-dom"

function LinkButton({addClass, to, children}) {
  return (
    <Link className={`${classes.btn} ${classes[addClass]}`} to={to}>{children}</Link>
  )
}

export default LinkButton