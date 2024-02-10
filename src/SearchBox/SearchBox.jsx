import { Formik, Field, ErrorMessage } from "formik";
import { useId } from "react";
import css from "./SearchBox.module.css";

export const SearchBox = ({ onSubmit }) => {
  const msgFieldId = useId();

  return (
    <>
      <Formik>
              <div className={css.search_box}>
          <label className={css.search_text} htmlFor={msgFieldId}>
            Find contacts by name
          </label>
          <Field
            className={css.search_input}
            as="textarea"
            name="message"
            id={msgFieldId}
            rows="1"
            onChange={(event) => {
              const { value } = event.target;
              onSubmit(value);
            }}
          />
          <ErrorMessage name="message" as="span" />
        </div>
      </Formik>
    </>
  );
};

{
  /* <Formik
  initialValues={{ message: "" }}
  onSubmit={(values, actions) => {
    // Ви можете залишити цю частину, якщо все ще хочете обробляти подання форми
    console.log("Form Submitted:", values.message);
    actions.setSubmitting(false);
  }}
  validationSchema={FeedbackSchema}
>
  {({ values, handleChange, handleBlur }) => (
    <div>
      <label htmlFor={msgFieldId}>Message</label>
      <Field
        as="textarea"
        name="message"
        id={msgFieldId}
        rows="1"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.message}
      />
      <ErrorMessage name="message" as="span" />
    </div>
  )}
</Formik>; */
}
