const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label>
        <span>Find contacts by name</span>
        <input
          type="text"
          name="filter"
          value={value}
          onChange={onChange}
          placeholder="example: Ivan"
        />
      </label>
    </div>
  );
};

export default Filter;
