import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import AddEntry from "./components/AddEntry";
import {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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

  const handleDelete = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const id = persons.find((person) => person.name === name).id;
      deletePerson(id).then(handleListRefresh()).catch((error) => console.log(error));
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
      updatePerson(id, person).then(handleListRefresh).catch(error => console.log(error));
    } else {
      createPerson(person).then(handleListRefresh).catch(error => console.log(error));
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
