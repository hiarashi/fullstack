import { useState } from 'react'

const Person = ({name, number}) => (<p>{name} {number}</p>)

const Filter = ({value, handleChange}) => (
  <div>
    filter shown with: <input value={value} onChange={handleChange}/>
  </div>
)

const AddEntry = ({nameValue, 
                   numberValue,
                   handleSubmit,
                   handleNameChange,
                   handleNumberChange
                  }) => (
                    <>
<h2>Add a new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={nameValue} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
                    </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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