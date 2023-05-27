import classes from "./Form.module.css"
import { useState, useContext } from "react"
import { AppContext } from "../state/context"
// import { db, storage, auth } from "../firebase/firebase-config"
// import { collection, addDoc } from "firebase/firestore"
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Button from "../ui/Button"

function Form() {
  let contextData = useContext(AppContext)
  let [bnbTitle, setBnbTitle] = useState('')
  let [bnbCity, setBnbCity] = useState('')
  let [bnbCountry, setBnbCountry] = useState('')
  let [bnbCost, setBnbCost] = useState('')
  let [imageInput, setImageInput] = useState('')
  let [imageFile, setImageFile] = useState('')
  function handleTitle(e) {
    setBnbTitle(e.target.value)
  }
  function handleCity(e) {
    setBnbCity(e.target.value)
  }
  function handleCountry(e) {
    setBnbCountry(e.target.value)
  }
  function handleCost(e) {
    setBnbCost(e.target.value)
  }
  function handleImage(e) {
    setImageInput(e.target.value)
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImageFile(reader.result)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    let userInputObj = {
      bnbTitle,
      bnbCity,
      bnbCountry,
      bnbCost,
      bnbImage: imageFile,
      stars: 4.5
    }
    contextData.handleAddBnb(userInputObj)
    setBnbTitle('')
    setBnbCity('')
    setBnbCountry('')
    setBnbCost('')
    setImageInput('')
  }
  // let [title, setTitle] = useState('')
  // let [city, setCity] = useState('')
  // let [country, setCountry] = useState('')
  // let [cost, setCost] = useState('')
  // let [image, setImage] = useState('')
  // let [imageUrl, setImageUrl] = useState('')
  // function handleTitle(e) {
  //   setTitle(e.target.value)
  // }
  // function handleCity(e) {
  //   setCity(e.target.value)
  // }
  // function handleCountry(e) {
  //   setCountry(e.target.value)
  // }
  // function handleCost(e) {
  //   setCost(e.target.value)
  // }
  // function handleImage(e) {
  //   setImage(e.target.value)
  //   setImageUrl(e.target.files[0])
  // }
  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   if(imageUrl === null) {
  //     return
  //   }
  //   let date = Date.now().toString()
  //   let imageRef = ref(storage, `images/${date}`)
  //   let result = await uploadBytes(imageRef, imageUrl)
  //   if(result) {
  //     alert('Image uploaded.')
  //   }
  //   let resultURL = await getDownloadURL(imageRef)
  //   let userInputObj = {
  //     bnbTitle: title,
  //     bnbCity: city,
  //     bnbCountry: country,
  //     bnbCost: parseInt(cost),
  //     bnbImage: resultURL,
  //     fullPath: imageRef.fullPath,
  //     stars: 4.5,
  //     userId: auth.currentUser.uid
  //   }
  //   await addDoc(collection(db, "bnbs"), userInputObj)
  //   setTitle('')
  //   setCity('')
  //   setCountry('')
  //   setCost('')
  //   setImage('')
  // }
  return (
    <form className={classes["user-input-form"]} onSubmit={handleSubmit}>
      <div className={classes["form-item"]}>
        <label htmlFor="title">Title:</label>
        <br />
        <input id="title" type="text" value={bnbTitle} onChange={handleTitle} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="city">Location:</label>
        <br />
        <input id="city" type="text" value={bnbCity} onChange={handleCity} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="country">Country:</label>
        <br />
        <input id="country" type="text" value={bnbCountry} onChange={handleCountry} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="cost">Cost:</label>
        <br />
        <input id="cost" type="number" value={bnbCost} onChange={handleCost} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="picture">Select image:</label>
        <br />
        <input accept='image/' id="picture" type="file" value={imageInput} onChange={handleImage} required></input>
      </div>
      <div className={classes["form-item-button"]}>
        <Button addClass="button">Save</Button>
      </div>
      {/* <div className={classes["form-item"]}>
        <label htmlFor="title">Title:</label>
        <br />
        <input id="title" type="text" value={title} onChange={handleTitle} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="city">Location:</label>
        <br />
        <input id="city" type="text" value={city} onChange={handleCity} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="country">Country:</label>
        <br />
        <input id="country" type="text" value={country} onChange={handleCountry} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="cost">Cost:</label>
        <br />
        <input id="cost" type="number" value={cost} onChange={handleCost} required></input>
      </div>
      <div className={classes["form-item"]}>
        <label htmlFor="picture">Select image:</label>
        <br />
        <input id="picture" type="file" value={image} onChange={handleImage} required></input>
      </div>
      <div className={classes["form-item-button"]}>
        <Button addClass="button">Save</Button>
      </div> */}
    </form>
  )
}

export default Form