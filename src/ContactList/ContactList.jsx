import { Contact } from "./Contact";
import css from "./Contact.module.css";

export const ContactList = ({ nameValue, deleteContact }) => {
  const contactsString = localStorage.getItem("contacts");
  const contacts = JSON.parse(contactsString);
  return (
    <>
      <ul className={css.contacts}>
        {contacts.map(
          (contact) =>
            (nameValue === "" ||
              contact.name.toLowerCase().includes(nameValue.toLowerCase())) && (
              <li className={css.contact_item} key={contact.id}>
                <Contact contact={contact} deleteContact={deleteContact} />
              </li>
            )
        )}
      </ul>
    </>
  );
};
