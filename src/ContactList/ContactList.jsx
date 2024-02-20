import Contact from "./Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    <>
      {contacts.length ? (
        <ul className={css.contacts}>
          {contacts.map((contact) => (
            <li className={css.contact_item} key={contact.id}>
              <Contact contact={contact} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <span>Contacts not found</span>
      )}
    </>
  );
}