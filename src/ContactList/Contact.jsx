import { IoPerson } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from "./Contact.module.css";

export const Contact = ({ contact, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(contact.id);
  };

  return (
    <>
      <div>
        <p>
          <IoPerson className={css.icon} />
          {contact.name}
        </p>
        <p>
          <BsFillTelephoneFill className={css.icon} />
          {contact.number}
        </p>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};