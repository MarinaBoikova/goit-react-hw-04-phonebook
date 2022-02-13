import { useState } from 'react';
// import React, { Component } from 'react';
import { nanoid } from 'nanoid';

// Рефакторим класс ContactForm
// Используем хук useState()

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      id: nanoid(),
      name,
      number,
    });
    reset();
  };

  const onChangeInput = e => {
    const { name, value } = e.target;

    switch (
      name //e.target.name
    ) {
      case 'name':
        setName(value); //e.target.value
        break;

      case 'number':
        setNumber(value); //e.target.value
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input
          type="text"
          onChange={onChangeInput}
          // onChange={e => setName(e.target.value)}
          value={name}
          name="name"
          placeholder="example: Boykova Marina"
          required
        />
      </label>

      <label>
        <span>Number:</span>
        <input
          type="tel"
          onChange={onChangeInput}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="example: 525-17-79"
          required
        />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
