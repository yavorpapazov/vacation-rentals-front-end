import { useState, useEffect, createContext } from "react"

let AppContext = createContext()
function AppContextProvider({children}) {
  let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState([])
  let [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false)
  async function handleUserRegister(registerEmail, registerPassword) {
    const response = await fetch('http://localhost:5000/login/signup', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({email: registerEmail, password: registerPassword})
    })
    const responseData = await response.json()
    alert(responseData.message)
  }
  async function handleUserLogin(email, password) {
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
    const responseData = await response.json()
    alert(responseData.message)
    setCurrentUser(responseData)
  }
  async function handleUserLogout() {
    await fetch('http://localhost:5000/login/logout', {
      method: 'POST',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    localStorage.clear()
    setCurrentUser(null)
  }
  async function handleAddBnb(userInputObj) {
    await fetch('http://localhost:5000/bnbs', {
      method: 'POST',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(userInputObj)
    })
    const response = await fetch('http://localhost:5000/bnbs')
    const receivedData = await response.json()
    setBnbs(receivedData)
  }
  async function handleDelete(bnbId) {
    await fetch(`http://localhost:5000/bnbs/${bnbId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json"
      }
    })
    const response = await fetch('http://localhost:5000/bnbs')
    const receivedData = await response.json()
    setBnbs(receivedData)
  }
  async function handleAddToCart(bnbId) {
    await fetch('http://localhost:5000/cart', {
      method: 'POST',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ itemId: bnbId })
    })
    const response = await fetch('http://localhost:5000/cart', {
      method: 'GET',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    const receivedCart = await response.json()
    setCart(receivedCart)
  }
  async function handleRemoveFromCart(bnbId) {
    await fetch(`http://localhost:5000/cart/${bnbId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json"
      }
    })
    const response = await fetch('http://localhost:5000/cart', {
      method: 'GET',
      mode: "cors",
      headers: {
        Authorization: currentUser.token,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
    const receivedCart = await response.json()
    setCart(receivedCart)
  }
  function handleDisplayCart() {
    setIsShoppingCartDisplayed(true)
  }
  function handleCloseCart() {
    setIsShoppingCartDisplayed(false)
  }
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])
  useEffect(() => {
    async function getBnbs() {
      const response = await fetch('http://localhost:5000/bnbs')
      const receivedData = await response.json()
      setBnbs(receivedData)
    }
    getBnbs()
  }, [])
  useEffect(() => {
    async function getCart() {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'GET',
        mode: "cors",
        headers: {
          Authorization: currentUser?.token,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
      const receivedData = await response.json()
      setCart(receivedData)
    }
    if (currentUser?.token) {
      getCart()
    }
  }, [currentUser?.token])
  let contextValue = {
    handleUserRegister,
    handleUserLogin,
    handleUserLogout,
    currentUser,
    handleAddBnb,
    handleDelete,
    handleAddToCart,
    handleRemoveFromCart,
    bnbs,
    cart,
    isShoppingCartDisplayed,
    handleDisplayCart,
    handleCloseCart
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }