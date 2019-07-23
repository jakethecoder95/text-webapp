import React from "react";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField";

const Login = props => {
  const onSubmit = userInfo => {
    console.log(userInfo);
  };
  const validate = items => {
    console.log(items);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} className="starter-page__form">
          <Field name="email" label="Email" component={FormField} />
          <Field
            name="password"
            label="Password"
            type="password"
            component={FormField}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine || invalid}
          >
            Login
          </button>
        </form>
      )}
    />
  );
};

export default Login;
