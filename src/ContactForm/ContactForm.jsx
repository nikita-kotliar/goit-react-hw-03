import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, <span className={css.error}>Too Short, min 3 symbols!</span>)
    .max(50, <span className={css.error}>Too Long, max 50 symbols!</span>)
    .required(<span className={css.error}>Required</span>),
  tel: Yup.string()
    .transform((value, originalValue) => {
      let phoneNumber = originalValue.replace(/[\s()+-]/g, "");

      if (phoneNumber.startsWith("+38") || phoneNumber.startsWith("38")) {
        phoneNumber = phoneNumber.replace(/\+?38/, "");
      }

      return phoneNumber;
    })
    .matches(/^\d{3,50}$/, {
      message: <span className={css.error}>Error! Min 3, Max 50 number.</span>,
    })
    .required(<span className={css.error}>Required</span>),
});

const initialValues = {
  username: "",
  tel: "",
};

export default function ContactForm({ onSubmit }) {
  const nameFieldId = useId();
  const telFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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

        <button className={css.button} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={onSubmit}
    //   validationSchema={FormSchema}
    // >
    //   <Form className={css.formContact}>
    //     <label htmlFor={nameFieldId}>Name</label>
    //     <Field
    //       className={css.inputContact}
    //       type="text"
    //       name="username"
    //       id={nameFieldId}
    //     />
    //     <ErrorMessage
    //       className={css.errorMessage}
    //       name="username"
    //       component="span"
    //     />
    //     <label htmlFor={numberFieldId}>Number</label>
    //     <Field
    //       className={css.inputContact}
    //       type="text"
    //       name="number"
    //       id={numberFieldId}
    //     />
    //     <ErrorMessage
    //       className={css.errorMessage}
    //       name="number"
    //       component="span"
    //     />
    //     <button className={css.addContactBtn} type="submit">
    //       Add contact
    //     </button>
    //   </Form>
    // </Formik>
  );
}
