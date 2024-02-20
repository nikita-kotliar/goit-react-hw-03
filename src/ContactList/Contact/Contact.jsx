import { IoPerson } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from "./Contact.module.css";

export default function Contact({ contact: { id, name, number }, onDelete }) {
  return (
    <>
      <div className={css.contact_div}>
        <IoPerson className={css.icon} />
        <p className={css.pf}>{name}</p>
        <BsFillTelephoneFill className={css.icon} />
        <p className={css.p}>{number}</p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </>
  );
}
