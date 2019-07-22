import React from "react";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField";

const SignupForm = props => {
  const onSubmit = userInfo => {
    console.log(userInfo);
  };
  const validate = items => {
    const errors = {};

    if (!items.email) {
      errors.email = "Required";
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <h2>Your Personal Info</h2>
          <Field name="email" label="Email" component={FormField} />
          <Field name="name" label="Name" component={FormField} />
          <Field
            name="password"
            label="Password"
            type="password"
            component={FormField}
          />
          <h2>Your Nexmo Info</h2>
          <Field
            name="nexmoNumber"
            label="Nexmo Number"
            component={FormField}
          />
          <Field name="apiKey" label="API Key" component={FormField} />
          <Field
            name="secretKey"
            label="Secret Key"
            type="password"
            component={FormField}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine || invalid}
          >
            Signup
          </button>
        </form>
      )}
    />
  );
};

export default SignupForm;
