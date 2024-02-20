import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";

const KEY_CONTACTS_LS = "Contacts";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(KEY_CONTACTS_LS);
    return savedContacts ? JSON.parse(savedContacts) : [];
  });

  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY_CONTACTS_LS, JSON.stringify(contacts));
  }, [contacts]);

  function formatPhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\s/g, "").replace(/\+?38/, "");

    const digits = phoneNumber.replace(/\D/g, "");

    let formattedNumber = "+38 (";

    for (let i = 0; i < digits.length; i++) {
      if (
        (digits.length === 6 && i === 5) ||
        (digits.length === 8 && (i === 5 || i === 7))
      ) {
        formattedNumber += digits[i];
      } else {
        if (i < 3) {
          formattedNumber += digits[i];
        } else if (i === 3) {
          formattedNumber += ") " + digits[i];
        } else if (i === 5 || i === 7) {
          formattedNumber += digits[i] + "-";
        } else {
          formattedNumber += digits[i];
        }
      }
    }

    return formattedNumber;
  }

  const handleAddContactBtn = (values, actions) => {
    actions.resetForm();
    setContacts((currentContacts) => {
      const newContact = {
        id: nanoid(10),
        name: (values.username =
          values.username.charAt(0).toUpperCase() + values.username.slice(1)),
        number: formatPhoneNumber(values.tel),
      };
      const updatedContacts = [...currentContacts, newContact];
      window.localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const handleSearch = (event) => {
    setSearchName(event.target.value.trim());
  };

  const handleDeleteBtn = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const searchContacts = searchName
    ? contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchName.toLowerCase());
      })
    : contacts;

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContactBtn} />
      <SearchBox inputValue={searchName} handleSearch={handleSearch} />
      <ContactList contacts={searchContacts} onDelete={handleDeleteBtn} />
    </div>
  );
}
