import classes from "./Home.module.css"
//import { useContext, useState, useEffect } from "react"
import { useContext } from "react"
import { AppContext } from "../state/context"
// import { db, storage, auth } from "../firebase/firebase-config"
// import { onAuthStateChanged } from "firebase/auth"
// import { doc, getDoc, addDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore"
// import { ref, deleteObject } from "firebase/storage"
import VacationRental from "../components/VacationRental"
//import ShoppingCart from "../components/ShoppingCart"
import Form from "../components/Form"

function Home() {
  let contextData = useContext(AppContext)
  // let [userEmail, setUserEmail] = useState(null)
  // let [userId, setUserId] = useState(null)
  // useEffect(() => {
  //   onAuthStateChanged(auth, currentUser => {
  //     if(currentUser) {
  //       setUserEmail(currentUser.email)
  //       setUserId(currentUser.uid)
  //     } else {
  //       setUserEmail(null)
  //       setUserId(null)
  //     }
  //   })
  // }, [])
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
    let response = await fetch('http://localhost:5000/cart', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(cartObj)
    })
    let data = await response.json()
  }
  // async function handleAddToCart(bnbId) {
  //   let addDocRef = doc(db, "bnbs", bnbId)
  //   let docSnap = await getDoc(addDocRef)
  //   let q = query(collection(db, "cart"), where("addedToCartBy", "==", userId), where("bnbId", "==", bnbId))
  //   let addCartDocSnap = await getDocs(q)
  //   if(addCartDocSnap.docs[0]) {
  //     alert('The item is already in the cart.')
  //     return
  //   }
  //   if(userId === null) {
  //     alert('Please log in to add or delete vacation rentals.')
  //     return
  //   }
  //   await addDoc(collection(db, "cart"), {...docSnap.data(), addedToCartBy: userId, bnbId: bnbId})
  // }
  // async function handleDelete(docId) {
  //   let q = query(collection(db, "cart"), where("addedToCartBy", "==", userId), where("bnbId", "==", docId))
  //   let addCartDocSnap = await getDocs(q)
  //   if(addCartDocSnap.docs[0]) {
  //     alert('Please remove item from shopping cart.')
  //     return
  //   }
  //   let deleteDocRef = doc(db, "bnbs", docId)
  //   let docSnap = await getDoc(deleteDocRef)
  //   if(userId === docSnap.data().userId) {
  //     await deleteDoc(deleteDocRef)
  //     let deleteImageRef = ref(storage, docSnap.data().fullPath)
  //     deleteObject(deleteImageRef)
  //   } else if(userId !== docSnap.data().userId && userId !== null) {
  //     alert('The item has been created by a different user and can not be deleted.')
  //     return
  //   } else if(userId === null) {
  //     alert('Please log in to add or delete vacation rentals.')
  //   }
  // }
  let resultVacationRental = contextData.bnbs.map(item => <VacationRental 
    key={item._id} 
    bnb={item} 
    manageCart={handleAddToCart} 
    // deleteBnb={handleDelete} 
    action="Add to Cart" 
    showDelete={true}
  />)
  // let resultVacationRental = contextData.bnbs.map(item => <VacationRental 
  //   key={item.id} 
  //   bnb={item} 
  //   manageCart={handleAddToCart} 
  //   deleteBnb={handleDelete} 
  //   action="Add to Cart" 
  //   showDelete={true}
  // />)
  return (
    <div className={classes.container}>
      {contextData.isShoppingCartDisplayed && <div className={classes.backdrop} />}
      <Form />
      {/* {userEmail !== null && <Form />}
      {userEmail !== null && <h3>User logged in: {userEmail}</h3>} */}
      <div className={classes["grid-container"]}>
        {resultVacationRental}
      </div>
      {/* {contextData.isShoppingCartDisplayed && 
      <div className={classes.modal}>
        <ShoppingCart />
      </div>} */}
    </div>
  );
}

export default Home