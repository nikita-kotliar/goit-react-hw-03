import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, <span className={css.error}>Too Short, min 3 symbols!</span>)
    .max(20, <span className={css.error}>Too Long, max 20 symbols!</span>)
    .required(<span className={css.error}>Required</span>),
  tel: Yup.string()
    .transform((value, originalValue) => {
      // Видаляємо усі пробіли, риски, дужки
      let phoneNumber = originalValue.replace(/[\s()+-]/g, "");

      // Перевіряємо чи номер починається з "+38" або "38", якщо так - видаляємо
      if (phoneNumber.startsWith("+38") || phoneNumber.startsWith("38")) {
        phoneNumber = phoneNumber.replace(/\+?38/, "");
      }

      return phoneNumber;
    })
    .matches(/^\d{0,10}$/, {
      message: <span className={css.error}>Too Long! Maximum 10 number.</span>,
    })
    .required(<span className={css.error}>Required</span>),
});

const initialValues = {
  username: "",
  tel: "",
};

export const ContactForm = ({ setContacts }) => {
  const nameFieldId = useId();
  const telFieldId = useId();

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

  const handleSubmit = (values, actions) => {
    console.log(values);
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.box}>
          <label className={css.text} htmlFor={nameFieldId}>
            Username
          </label>
          <Field
            className={css.input}
            type="text"
            name="username"
            id={nameFieldId}
          />
          <ErrorMessage name="username" as="span" />
        </div>

        <div className={css.box}>
          <label className={css.text} htmlFor={telFieldId}>
            Tel
          </label>
          <Field
            className={css.input}
            type="tel"
            name="tel"
            id={telFieldId}
            onKeyDown={(e) => {
              if (
                !(
                  (e.keyCode > 95 && e.keyCode < 106) ||
                  (e.keyCode > 47 && e.keyCode < 58) ||
                  e.keyCode === 8 ||
                  e.keyCode === 9 ||
                  e.keyCode === 116
                )
              ) {
                e.preventDefault();
              }
            }}
          />
          <ErrorMessage name="tel" as="span" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
