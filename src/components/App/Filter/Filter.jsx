import PropTypes from 'prop-types';

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

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Filter;
