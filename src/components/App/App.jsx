// import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import * as storage from './services/localStorage';
import { useState, useEffect } from 'react';
import s from './App.module.css';

const STORAGE_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () => storage.get(STORAGE_KEY) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    storage.save(STORAGE_KEY, contacts);
  }, [contacts]);

  const onSubmit = newContact => {
    const { id, name, number } = newContact;
    const isInContactList = contact => contact.name === newContact.name;

    contacts.some(isInContactList)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(contacts => [...contacts, { id, name, number }]);
  };

  const onChangeInput = e => {
    setFilter(e.target.value);
  };

  const onFilterChange = () => {
    const value = filter;
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(elem => elem.id !== id));
  };
  return (
    <>
      <div className={s.wrap}>
        <ContactForm onSubmitForm={onSubmit} contacts={contacts} />
      </div>
      <h2 className={s.subtitle}>Contacts:</h2>
      <Filter value={filter} onChange={onChangeInput} />
      <ContactList contacts={onFilterChange()} onDelete={deleteContact} />
    </>
  );
};

export default App;
