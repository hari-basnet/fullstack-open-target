import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);
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
    setSearchString(event.target.value);

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchString.toLowerCase())
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
      <div>
        filter shown with:{" "}
        <input value={searchString} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <form>
        <div style={{ display: "flex", flexDirection: "column" }}>
          name: <input value={newName} onChange={handleNameChange} />
          phone number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
