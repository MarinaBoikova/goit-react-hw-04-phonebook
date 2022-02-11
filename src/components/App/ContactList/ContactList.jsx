import Paper from '../common/Paper/Paper';

const ContactList = ({ contacts, onDelete }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <Paper key={id}>
        <li>
          <span>{name}</span>: {number}
        </li>
        <button type="button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </Paper>
    ))}
  </ul>
);

export default ContactList;
