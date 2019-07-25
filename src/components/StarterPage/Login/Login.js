import React from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField";
import { SIGN_IN } from "../../../redux/types";

const Login = props => {
  const onSubmit = userInfo => {
    props.login(userInfo);
  };
  const validate = values => {
    const errors = {};
    const loginError = props.asyncErrors;
    if (loginError) {
      if (loginError.type === "email" && loginError.value === values.email) {
        errors.email = loginError.message;
      }
      if (
        loginError.type === "password" &&
        loginError.value === values.password
      ) {
        errors.password = loginError.message;
      }
    }
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form
          onSubmit={handleSubmit}
          className="page-content starter-page__form"
        >
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

const mapStateToProps = ({ errors }) => ({
  asyncErrors: errors.signin
});

const mapDispatchToProps = dispatch => ({
  login: userInfo => dispatch({ type: SIGN_IN, payload: { ...userInfo } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
