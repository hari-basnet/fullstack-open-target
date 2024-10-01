import { useEffect, useState } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  const doesNameExists = (name) => {
    const matchedPersons = persons.filter(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    return matchedPersons.length > 0;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const string = event.target.value;
    setSearchString(string);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(string.toLowerCase())
    );

    if (filteredPersons.length > 0) {
      setPersons(filteredPersons);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };
    const updatedPersons = persons.concat(newPerson);

    if (doesNameExists(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook !!!`);
      setNewName("");
      setNewPhoneNumber("");
      return;
    }
    setPersons(updatedPersons);
    setNewName("");
    setNewPhoneNumber("");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "80%",
        margin: "0 auto",
        whiteSpace: "nowrap",
      }}
    >
      <h2>Phonebook</h2>
      <Filter
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleClick={handleClick}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
