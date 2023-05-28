import { useState, useEffect, createContext } from "react"
// import { db, auth } from "../firebase/firebase-config"
// import { onAuthStateChanged } from "firebase/auth"
// import { collection, onSnapshot, query, where } from "firebase/firestore"

let AppContext = createContext()
function AppContextProvider({children}) {
  let [cart, setCart] = useState([])
  let [bnbs, setBnbs] = useState([])
  let [isShoppingCartDisplayed, setIsShoppingCartDisplayed] = useState(false)
  //let [userAddedToCartId, setUserAddedToCartId] = useState(null)
  async function handleAddBnb(userInputObj) {
    await fetch('http://localhost:5000/bnbs', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(userInputObj)
    })
    let response = await fetch('http://localhost:5000/bnbs/')
    let receivedData = await response.json()
    setBnbs(receivedData)
  }
  async function handleDelete(bnbId) {
    await fetch(`http://localhost:5000/bnbs/${bnbId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let response = await fetch('http://localhost:5000/bnbs/')
    let receivedData = await response.json()
    setBnbs(receivedData)
  }
  async function handleAddToCart(bnbId) {
    let bnb = await fetch(`http://localhost:5000/bnbs/${bnbId}`)
    let receivedData = await bnb.json()
    let cartObj = {
      bnbTitle: receivedData.bnbTitle,
      bnbCity: receivedData.bnbCity,
      bnbCountry: receivedData.bnbCountry,
      bnbCost: receivedData.bnbCost,
      bnbImage: receivedData.bnbImage,
      stars: receivedData.stars
    }
    await fetch('http://localhost:5000/cart', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(cartObj)
    })
    let response = await fetch('http://localhost:5000/cart/')
    let receivedCart = await response.json()
    setCart(receivedCart)
  }
  async function handleRemoveFromCart(bnbId) {
    await fetch(`http://localhost:5000/cart/${bnbId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let response = await fetch('http://localhost:5000/cart/')
    let receivedCart = await response.json()
    setCart(receivedCart)
  }
  // function handleBnbs(result) {
  //   setBnbs(result)
  // }
  // function handleCart(result) {
  //   setCart(result)
  // }
  function handleDisplayCart() {
    setIsShoppingCartDisplayed(true)
  }
  function handleCloseCart() {
    setIsShoppingCartDisplayed(false)
  }
  // useEffect(() => {
  //   onAuthStateChanged(auth, currentUser => {
  //     if(currentUser) {
  //       setUserAddedToCartId(currentUser.uid)
  //     } else {
  //       setUserAddedToCartId(null)
  //     }
  //   })
  // }, [])
  useEffect(() => {
    async function getBnbs() {
      let response = await fetch('http://localhost:5000/bnbs/')
      let receivedData = await response.json()
      setBnbs(receivedData)
    }
    getBnbs()
  }, [])
  useEffect(() => {
    async function getCart() {
      let response = await fetch('http://localhost:5000/cart/')
      let receivedData = await response.json()
      setCart(receivedData)
    }
    getCart()
  }, [])
  // useEffect(() => {
  //   let bnbsCollectionRef = collection(db, "bnbs")
  //   let getBnbs = async () => {
  //     onSnapshot(bnbsCollectionRef, snapshot => {
  //       let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
  //       setBnbs(result)
  //     })
  //   }
  //   getBnbs()
  // }, [])
  // useEffect(() => {
  //   let cartCollectionRef = collection(db, "cart")
  //   let q = query(cartCollectionRef, where("addedToCartBy", "==", userAddedToCartId))
  //   let getCart = async () => {
  //     onSnapshot(q, snapshot => {
  //       let result = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
  //       setCart(result)
  //     })
  //   }
  //   getCart()
  // }, [userAddedToCartId])
  let contextValue = {
    handleAddBnb,
    handleDelete,
    handleAddToCart,
    handleRemoveFromCart,
    // handleBnbs,
    // handleCart,
    bnbs,
    cart,
    isShoppingCartDisplayed,
    handleDisplayCart,
    handleCloseCart
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }