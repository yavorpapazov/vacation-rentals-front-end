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
    //let response = await fetch('http://localhost:5000/bnbs', {
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
    // let receivedData = await response.json()
    // console.log(receivedData)
    // alert(`${receivedData.bnbCity} has been added to DB`)
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
    isShoppingCartDisplayed,
    // handleBnbs,
    // handleCart,
    bnbs,
    cart,
    handleDisplayCart,
    handleCloseCart
  }
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }