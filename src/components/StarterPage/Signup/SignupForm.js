import React from "react";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField";
import isEmail from "../../../util/validateEmail";
import isPhoneNumber from "../../../util/validatePhone";

const SignupForm = props => {
  const onSubmit = userInfo => {
    console.log(userInfo);
  };
  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!isEmail(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be longer than 5 characters";
    }
    if (!values.nexmoNumber) {
      errors.nexmoNumber = "Required";
    } else if (!isPhoneNumber(values.nexmoNumber)) {
      errors.nexmoNumber = "Invalid phone number";
    }
    if (!values.apiKey) {
      errors.apiKey = "Required";
    }
    if (!values.secretKey) {
      errors.secretKey = "Required";
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Your Personal Info</h2>
          <hr />
          <Field name="email" label="Email" component={FormField} />
          <Field name="name" label="Name" component={FormField} />
          <Field
            name="password"
            label="Password"
            type="password"
            component={FormField}
          />
          <h2 className="text-center">Your Nexmo Info</h2>
          <hr />
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
