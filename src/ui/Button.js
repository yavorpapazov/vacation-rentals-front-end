import classes from "./Button.module.css"

function Button({addClass, onClick, children}) {
  return (
    <button className={classes[addClass]} onClick={onClick}>{children}</button>
  )
}

export default Button