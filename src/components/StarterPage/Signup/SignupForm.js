import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";

import FormField from "../FormField/FormField";
import isEmail from "../../../util/validateEmail";
import isPhoneNumber from "../../../util/validatePhone";
import { SIGN_UP } from "../../../redux/types";

const SignupForm = props => {
  const [signingUp, setSigningUp] = useState(false);
  const onSubmit = userInfo => {
    setSigningUp(true);
    props.signup(userInfo);
  };
  const validate = values => {
    const errors = {};
    const asyncErrors = props.asyncErrors;

    if (asyncErrors) {
      setSigningUp(false);
      asyncErrors.data.forEach(err => {
        if (values[err.param] === err.value) {
          errors[err.param] = err.msg;
        }
      });
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!isEmail(values.email.trim())) {
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
    } else if (!isPhoneNumber(values.nexmoNumber.trim())) {
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

  const signingUpLoader = (
    <div className="signing-up__loader">
      <div
        className="spinner-border"
        style={{
          width: "5rem",
          height: "5rem"
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p>Signing you up..</p>
    </div>
  );

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
            <h2 className="text-center">Your Personal Info</h2>
            <hr className="hr" />
            <Field name="email" label="Email" component={FormField} />
            <Field name="name" label="Name" component={FormField} />
            <Field
              name="password"
              label="Password"
              type="password"
              component={FormField}
            />
            <h2 className="text-center">Your Nexmo Info</h2>
            <hr className="hr" />
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
