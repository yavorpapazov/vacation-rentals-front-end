import { useState, useEffect } from 'react'
import People from './People'

function App() {
  let [ people, setPeople ] = useState([])
  let [ name, setName ] = useState('')
  let [ age, setAge ] = useState('')

  function handleName(e) {
    setName(e.target.value)
  }
  function handleAge(e) {
    setAge(e.target.value)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    let userInputObj = {
      name,
      age
    }
    setName('')
    setAge('')
    let response = await fetch('http://localhost:5000/api/people/', {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInputObj)
    })
    let receivedData = await response.json()
    alert(`${receivedData.name} has been added to DB`)
  }
  async function handleDetails(itemId) {
    let response = await fetch(`http://localhost:5000/api/people/${itemId}`)
    let receivedData = await response.json()
    alert(`${receivedData[0].name}, ID: ${receivedData[0]._id}`)
  }
  async function handleRemove(itemId) {
    let response = await fetch(`http://localhost:5000/api/people/${itemId}`, {
      method: 'DELETE',
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    let receivedData = await response.json()
    alert(`${receivedData.name} has been removed from DB`)
  }
  useEffect(() => {
    async function getData() {
      let response = await fetch('http://localhost:5000/api/people/')
      let receivedData = await response.json()
      setPeople(receivedData)
    }
    getData()
  }, [])
  let result = people.map(item => <People key={item._id} {...item} details={handleDetails} remove={handleRemove} />)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input id="name" type="text" value={name} onChange={handleName} required></input>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <br />
          <input id="age" type="number" value={age} onChange={handleAge} required></input>
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