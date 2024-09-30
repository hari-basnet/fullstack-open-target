import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "0408989999" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const doesNameExists = (name) => {
    const matchedPersons = persons.filter(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    console.log(matchedPersons);
    return matchedPersons.length > 0;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
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
