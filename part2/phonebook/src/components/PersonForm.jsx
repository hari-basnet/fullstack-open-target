const PersonForm = ({
  newName,
  newPhoneNumber,
  handleNameChange,
  handlePhoneNumberChange,
  handleAdd,
}) => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone number:
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
