import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import store from "store";

import FormField from "../../../StarterPage/FormField/FormField";
import isEmail from "../../../../util/validateEmail";
import isPhoneNumber from "../../../../util/validatePhone";
import server from "../../../../api/server";
import Alerts from "../Alerts";
import { UPDATE_USER } from "../../../../redux/types";

const PersonalInfoForm = props => {
  const [submitting, setSubmitting] = useState(false);
  const [alerts, setAlerts] = useState({ error: null, success: null });
  const [asyncError, setAsyncError] = useState({});

  const onSubmit = async info => {
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/manage/update-personal-settings",
        { ...info },
        { headers: { Authorization: authString } }
      );
      props.updateUser(response.data.user);
      setAlerts({ error: null, success: "Updated Successfully" });
      setAsyncError({});
    } catch (err) {
      if (err.response) {
        setAlerts({ success: null, error: err.response.data.message });
        err.response.data.data
          ? setAsyncError(err.response.data.data)
          : setAsyncError(err.response.data);
      }
      console.log(err.response);
    }
    setSubmitting(false);
  };

  const validate = values => {
    const errors = {};
    // Express validator errors
    if (Array.isArray(asyncError)) {
      asyncError.forEach(err => {
        if (values[err.param] === err.value) {
          errors[err.param] = err.msg;
        }
      });
    } else {
      // Non-express validator errors
      if (values[asyncError.type] === asyncError.value) {
        errors[asyncError.type] = asyncError.message;
      }
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!isEmail(values.email.trim())) {
      errors.email = "Invalid email";
    }
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required";
    } else if (!isPhoneNumber(values.phoneNumber)) {
      errors.phoneNumber = "Not a valid phone number";
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        name: props.user.name,
        email: props.user.email,
        phoneNumber: props.user.phoneNumber
      }}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit} className="settings__form">
          <h3 className="text-center">Your Personal Info</h3>
          <hr className="hr" />

          <Alerts setAlerts={setAlerts} {...alerts} />

          <Field name="email" label="Email" component={FormField} />
          <Field name="name" label="Name" component={FormField} />
          <Field
            name="phoneNumber"
            label="Phone Number"
            component={FormField}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={pristine || invalid || submitting}
          >
            {submitting && (
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            Save
          </button>
        </form>
      )}
    />
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  updateUser: updatedUser =>
    dispatch({ type: UPDATE_USER, payload: updatedUser })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfoForm);
