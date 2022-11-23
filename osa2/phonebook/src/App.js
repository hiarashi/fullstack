import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Person from './components/Person'
import AddEntry from './components/AddEntry'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })

  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(e => e.name === nameObject.name).length > 0){
      alert(`${nameObject.name} is already added to the phonebook`)
    }
    else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const entriesToShow = newFilter==='' 
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange}/>
      <AddEntry 
      nameValue={newName} 
      numberValue={newNumber} 
      handleSubmit={addName}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
        {entriesToShow.map(person =>
          <Person key={person.name} name={person.name} number={person.number}/>
        )}
    </div>
  )

}

export default App