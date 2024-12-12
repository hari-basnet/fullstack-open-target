const PersonForm = ({
  newName,
  newPhoneNumber,
  handleNameChange,
  handlePhoneNumberChange,
  handleAdd,
}) => {
  return (
    <form>
      <div style={{ display: "flex", flexDirection: "column" }}>
        name: <input value={newName} onChange={handleNameChange} />
        phone number:{" "}
        <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleAdd}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
