import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";

import FormField from "../FormField/FormField";
import isEmail from "../../../util/validateEmail";
import isPhoneNumber from "../../../util/validatePhone";
import { SIGN_UP } from "../../../redux/types";
import Spinner from "../../Loading/Spinner";

const SignupForm = props => {
  const [signingUp, setSigningUp] = useState(false);

  const onSubmit = userInfo => {
    setSigningUp(true);
    props.signup(userInfo);
  };

  const validate = values => {
    const errors = {};
    // Handle Asyncronous errors
    const asyncErrors = props.asyncErrors;
    if (asyncErrors) {
      setSigningUp(false);
      asyncErrors.data.forEach(err => {
        if (values[err.param] === err.value) {
          errors[err.param] = err.msg;
        }
      });
    }
    // Handle normal Errors
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!isEmail(values.email.trim())) {
      errors.email = "Invalid email";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!isPhoneNumber(values.phoneNumber)) {
      errors.phoneNumber = "Not a valid phone number.";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be longer than 5 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Doesn't match password";
    }
    return errors;
  };

  const signingUpLoader = <Spinner message="Signing you up..." size="large" />;

  return (
    <>
      {signingUp && !props.asyncErrors ? signingUpLoader : <></>}
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
          <form
            onSubmit={handleSubmit}
            style={signingUp ? { display: "none" } : {}}
          >
            <Field name="name" label="Name" component={FormField} />
            <Field name="email" label="Email" component={FormField} />
            <Field
              name="phoneNumber"
              type="number"
              label="Phone Number"
              component={FormField}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              component={FormField}
              toggleablePswField
            />
            <Field
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              component={FormField}
              toggleablePswField
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
    </>
  );
};

const mapStateToProps = ({ errors }) => ({
  asyncErrors: errors.signup
});

const mapDispatchToProps = dispatch => ({
  signup: userInfo => dispatch({ type: SIGN_UP, payload: userInfo })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
