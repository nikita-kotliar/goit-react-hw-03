import "./App.css";
import { useState, useEffect } from "react";
import { ContactList } from "./ContactList/ContactList";
import { SearchBox } from "./SearchBox/SearchBox";
import { ContactForm } from "./ContactForm/ContactForm";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("contacts");
    return savedContacts
      ? JSON.parse(savedContacts)
      : [];
  });

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const [nameValue, setNameValue] = useState("");

  const handleSearchSubmit = (value) => {
    setNameValue(value);
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    window.localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm setContacts={setContacts} />
      <SearchBox onSubmit={handleSearchSubmit} />
      {contacts.length !== 0 ? (
        <ContactList nameValue={nameValue} deleteContact={deleteContact} />
      ) : (
        <p className="noContacts">There are no contacts yet</p>
      )}
    </>
  );
}

export default App;
