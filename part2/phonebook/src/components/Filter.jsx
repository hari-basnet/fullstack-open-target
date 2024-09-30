const Filter = ({ searchString, handleSearchChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={searchString}
        onChange={(event) => handleSearchChange(event)}
      />
    </div>
  );
};

export default Filter;
