import { useState, useEffect } from 'react'
import Bnbs from './Bnbs'

function App() {
  let [bnbTitle, setBnbTitle] = useState('')
  let [bnbCity, setBnbCity] = useState('')
  let [bnbCountry, setBnbCountry] = useState('')
  let [bnbCost, setBnbCost] = useState('')
  let [imageInput, setImageInput] = useState('')
  let [imageFile, setImageFile] = useState('')
  let [bnbs, setBnbs] = useState([])

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
      bnbImage: imageFile
    }
    setBnbTitle('')
    setBnbCity('')
    setBnbCountry('')
    setBnbCost('')
    setImageInput('')
    let response = await fetch('http://localhost:5000/bnbs', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(userInputObj)
    })
    let receivedData = await response.json()
    alert(`${receivedData.bnbCity} has been added to DB`)
  }
  async function handleDetails(itemId) {
    let response = await fetch(`http://localhost:5000/bnbs/${itemId}`)
    let receivedData = await response.json()
    alert(`Description: ${receivedData.bnbTitle}`)
  }
  async function handleRemove(itemId) {
    let response = await fetch(`http://localhost:5000/bnbs/${itemId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let receivedData = await response.json()
    alert(`${receivedData.bnbCity} has been removed from DB`)
  }
  useEffect(() => {
    async function getData() {
      let response = await fetch('http://localhost:5000/bnbs/')
      let receivedData = await response.json()
      setBnbs(receivedData)
    }
    getData()
  }, [])
  let result = bnbs.map(item => <Bnbs key={item._id} {...item} getDetails={handleDetails} remove={handleRemove} />)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input id="title" type="text" value={bnbTitle} onChange={handleTitle} required></input>
        </div>
        <div>
          <label htmlFor="city">Location:</label>
          <br />
          <input id="city" type="text" value={bnbCity} onChange={handleCity} required></input>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <br />
          <input id="country" type="text" value={bnbCountry} onChange={handleCountry} required></input>
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <br />
          <input id="cost" type="number" value={bnbCost} onChange={handleCost} required></input>
        </div>
        <div>
          <label htmlFor="image">Select image:</label>
          <br />
          <input accept='image/' id="image" type="file" value={imageInput} onChange={handleImage} required></input>
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
      {result}
    </div>
  )
}

export default App