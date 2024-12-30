import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => {
    return (
      <div
        key={person.name + "wrapper"}
        style={{
          display: "flex",
        }}
      >
        <Person
          key={person.name + "persoon"}
          name={person.name}
          number={person.number}
        />
        <button
          key={person.name + "button"}
          onClick={() => handleDelete(person.id, person.name)}
        >
          Delete
        </button>
      </div>
    );
  });
};

export default Persons;
