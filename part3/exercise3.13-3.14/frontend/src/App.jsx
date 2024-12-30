import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phoneService from "../src/services/phonebooks";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [searchString, setSearchString] = useState("");
  const [notification, setNotification] = useState({ type: null, text: null });

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

  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    };
    const foundPerson = persons.find(
      (person) => person.name === newName.trim()
    );

    if (doesNameExists(newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        foundPerson.number = newPhoneNumber;
        phoneService
          .update(foundPerson.id, foundPerson)
          .then((response) => {
            setPersons((prevPerson) =>
              prevPerson.map((person) =>
                person.id !== response.id ? person : response
              )
            );
          })
          .catch((error) => {
            if (error) {
              setNotification({
                type: "error",
                text: `Information of ${foundPerson.name} has already been removed from server`,
              });
            }
            setTimeout(() => {
              setNotification({ type: null, text: null });
            }, 5000);
          });
      }
      setNewName("");
      setNewPhoneNumber("");
      return;
    }
    phoneService.create(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNotification({
        type: "success",
        text: `Added ${response.name}`,
      });
      setTimeout(() => {
        setNotification({ type: null, text: null });
      }, 5000);
      setNewName("");
      setNewPhoneNumber("");
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      phoneService.deletePerson(id).then((response) => {
        setPersons((prevPerson) =>
          prevPerson.filter((person) => person.id != response.id)
        );
        setNotification({
          type: "success",
          text: `Deleted ${response.name} successfully`,
        });
        setTimeout(() => {
          setNotification({ type: null, text: null });
        }, 5000);
      });
    }
  };

  useEffect(() => {
    phoneService.getAll().then((response) => {
      console.log(response);
      setPersons(response);
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
      <Notification className={notification.type} message={notification.text} />
      <h2>Phonebook</h2>
      <Filter
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleAdd={handleAdd}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      {persons.length > 0 && (
        <Persons persons={persons} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
