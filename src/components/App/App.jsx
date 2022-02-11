import { useState, useEffect } from 'react';

// import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import * as storage from './services/localStorage';

const STORAGE_KEY = 'contacts';

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//Рефакторинг App
// Добавляем useState()

const App = () => {
  const [contacts, setContacts] = useState(
    () => storage.get(STORAGE_KEY) ?? [],
  );
  // componentDidMount() {
  //   const savedContacts = storage.get(STORAGE_KEY);
  //   if (savedContacts) {
  //     this.setState({ contacts: savedContacts });
  //   }
  // }
  const [filter, setFilter] = useState('');

  useEffect(() => {
    storage.save(STORAGE_KEY, contacts);
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;
  //   if (prevState.contacts !== contacts) {
  //     storage.save(STORAGE_KEY, contacts);
  //   }
  // }

  const onSubmit = newContact => {
    const { id, name, number } = newContact;

    const isInContactList = contact => contact.name === newContact.name;

    contacts.some(isInContactList)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(contacts => ({
          contacts: [...contacts, { id, name, number }],
        }));
  };

  const onChangeInput = e => {
    setFilter(e.target.value);
  };
  // onChangeInput = e => {
  //   this.setState({ filter: e.target.value });
  // };

  const onFilterChange = () => {
    const value = filter;
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(value.toLowerCase()),
    );
  };
  // onFilterChange = () => {
  //   const value = this.state.filter;
  //   return this.state.contacts.filter(elem =>
  //     elem.name.toLowerCase().includes(value.toLowerCase()),
  //   );
  // };

  const deleteContact = id => {
    setContacts(prevContacts => {
      prevContacts.filter(elem => elem.id !== id);
    });
  };
  // deleteContact = id => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(elem => elem.id !== id),
  //   }));
  // };

  return (
    <>
      <h1>Phonebook</h1>
      <div>
        <ContactForm onSubmit={onSubmit} contacts={contacts} />
      </div>
      <h2>Contacts:</h2>
      <Filter value={filter} onChange={onChangeInput} />
      <ContactList contacts={onFilterChange()} onDelete={deleteContact} />
    </>
  );
};

//   render() {
//     const { contacts, filter } = this.state;

//     return (
//       <div>
//         <div>
//           <h1>Phonebook</h1>
//           <div>
//             <ContactForm onSubmit={this.onSubmit} contacts={contacts} />
//           </div>
//           <h2>Contacts:</h2>
//           <Filter value={filter} onChange={this.onChangeInput} />
//           <ContactList
//             contacts={this.onFilterChange()}
//             onDelete={this.deleteContact}
//           />
//         </div>
//       </div>
//     );
//   }
// }
export default App;
