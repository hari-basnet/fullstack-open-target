import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const doesNameExists = (name) => {
    const matchedPersons = persons.filter(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
    console.log(matchedPersons);
    return matchedPersons.length > 0;
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    const updatedPersons = persons.concat(newPerson);

    if (doesNameExists(newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook !!!`);
      setNewName("");
      return;
    }
    setPersons(updatedPersons);
    setNewName("");
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
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
