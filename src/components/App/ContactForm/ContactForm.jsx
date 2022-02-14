import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

const ContactForm = ({ onSubmitForm, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    onSubmitForm({
      id: nanoid(),
      name,
      number,
    });
    reset();
  };

  const onChangeInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
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
    <form className={s.contacsForm} onSubmit={onSubmit}>
      <label className={s.label}>
        <span className={s.title}>Name:</span>
        <input
          className={s.textField}
          type="text"
          onChange={onChangeInput}
          value={name}
          name="name"
          placeholder="your name"
          required
        />
      </label>

      <label className={s.label}>
        <span className={s.title}>Number:</span>
        <input
          className={s.textField}
          type="tel"
          onChange={onChangeInput}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="your number"
          required
        />
      </label>

      <button type="submit" className={s.addBtn}>
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
