import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField";
import Spinner from "../../Loading/Spinner";
import { SIGN_IN } from "../../../redux/types";

const Login = props => {
  const [loggingIn, setLoggingIn] = useState(false);
  const onSubmit = userInfo => {
    setLoggingIn(true);
    props.login(userInfo);
  };
  const validate = values => {
    const errors = {};
    const loginError = props.asyncErrors;
    if (loginError) {
      setLoggingIn(false);
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

  const loggingInLoader = <Spinner message="Logging In..." size="large" />;

  return (
    <div className="page-content container">
      {loggingIn && !props.asyncErrors ? loggingInLoader : <></>}
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
          <form
            onSubmit={handleSubmit}
            className="starter-page__form"
            style={loggingIn ? { display: "none" } : {}}
          >
            <Field name="email" label="Email" component={FormField} />
            <Field
              name="password"
              label="Password"
              type="password"
              component={FormField}
              toggleablePswField
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
    </div>
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
