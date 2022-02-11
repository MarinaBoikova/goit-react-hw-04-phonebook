// import React, { useState } from 'react';

import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import * as storage from './services/localStorage';

const STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = storage.get(STORAGE_KEY);
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      storage.save(STORAGE_KEY, contacts);
    }
  }

  onSubmit = newContact => {
    const { id, name, number } = newContact;

    const isInContactList = contact => contact.name === newContact.name;

    this.state.contacts.some(isInContactList)
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { id, name, number }],
        }));
  };

  onChangeInput = e => {
    this.setState({ filter: e.target.value });
  };

  onFilterChange = () => {
    const value = this.state.filter;
    return this.state.contacts.filter(elem =>
      elem.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(elem => elem.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div>
        <div>
          <h1>Phonebook</h1>
          <div>
            <ContactForm onSubmit={this.onSubmit} contacts={contacts} />
          </div>
          <h2>Contacts:</h2>
          <Filter value={filter} onChange={this.onChangeInput} />
          <ContactList
            contacts={this.onFilterChange()}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
export default App;
