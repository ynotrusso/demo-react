import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [fruits, setFruits] = useState([1, 2, 3])
  
  const getFruits = async () => {
    let response = await axios.get('http://localhost:4010/fruits')
    setFruits(response.data)
  }
  
  useEffect( () => {
    getFruits()
  }, [])

  useEffect(() => {
    console.log(fruits);
  }, [fruits])

  const addFruit = async (e) => {
    e.preventDefault()
    console.log(e.target.fruit.value);
    let newFruit = {
      name: e.target.fruit.value,
      price: 10
    }
    await axios.post('http://localhost:4010/fruits', newFruit)
    setFruits([...fruits, newFruit])
  }

  const searchFunction = (e) => {
    console.log(e.target.value)
    let filteredFruits = fruits.filter(f => f.name === e.target.value)
    console.log(filteredFruits);
    setFruits(filteredFruits)
  }

  return (
    <>
      <input onKeyUp={searchFunction} placeholder='search' />
      <table>
        <tbody>
          {
            fruits.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.price}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <form onSubmit={addFruit}>
        <input name="fruit" />
        <button>Add fruit</button>
      </form>
    </>
  );
}

export default App;
