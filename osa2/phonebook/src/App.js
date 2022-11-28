import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import AddEntry from "./components/AddEntry";
import Notification from "./components/Notification";
import {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/phonebook";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newNotification, setNotification] = useState({message:null, type:''});

  useEffect(() => {
    handleListRefresh();
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNotification = (message, type) =>{
    setNotification({message: message, type: type});
    setTimeout(()=> {
          setNotification({message: null, type: ''});
        }, 5000)
  }

  const handleDelete = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const deletedPerson = persons.find((person) => person.name === name);
      deletePerson(deletedPerson.id)
      .then(() => {
        handleNotification(`${deletedPerson.name} successfully deleted`, 'notification')
        })
      .catch((error) => {
        handleNotification(`${deletedPerson.name} was already deleted!`, 'error')
      })
      .finally(() => {
        handleListRefresh()})
    }
  };

  const handleListRefresh = () => {
    getAllPersons().then((response) => {
      setPersons(response.data);
    });
  }

  const addName = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.filter((e) => e.name === person.name).length > 0 &&
      window.confirm(
        `${person.name} is already added to the phonebook, replace old number with a new one?`
      )
    ) {
      const id = persons.find((entry) => entry.name === person.name).id;
      updatePerson(id, person)
      .then(()=>{
        handleNotification(`${person.name} number updated successfully`,'notification')
        handleListRefresh()})
      .catch(error => handleNotification(`Could not update ${person.name}`, 'error'));
    } else if (persons.filter((e) => e.name === person.name).length === 0){
      createPerson(person)
      .then(() => {
        handleNotification(`${person.name} successfully created`,'notification')
        handleListRefresh()})
      .catch(error => handleNotification(`Could not create ${person.name}`, 'error'));
      setNewName("");
      setNewNumber("");
    }
  };

  const entriesToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification.message} type={newNotification.type}/>
      <Filter value={newFilter} handleChange={handleFilterChange} />
      <AddEntry
        nameValue={newName}
        numberValue={newNumber}
        handleSubmit={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {entriesToShow.map((person) => (
        <div key={person.name}>
          <Person name={person.name} number={person.number} />
          <button onClick={(event) => handleDelete(person.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
