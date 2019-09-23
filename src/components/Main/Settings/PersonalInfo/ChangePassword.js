import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import store from "store";

import FormField from "../../../StarterPage/FormField/FormField";
import server from "../../../../api/server";
import Alerts from "../Alerts";

const PersonalInfo = props => {
  const [submitting, setSubmitting] = useState(false);
  const [alerts, setAlerts] = useState({ error: null, success: null });
  const [asyncError, setAsyncError] = useState({});

  const onSubmit = async info => {
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      await server.post(
        "/manage/update-user-password",
        { ...info },
        { headers: { Authorization: authString } }
      );
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
    // Async Errors
    if (values[asyncError.type] === asyncError.value) {
      errors[asyncError.type] = asyncError.message;
    }
    // Non Async Errors
    if (values.oldPassword) {
      if (values.oldPassword === values.newPassword) {
        errors.newPassword = "New Password must be different";
      }
      if (!values.newPassword) {
        errors.newPassword = "Required";
      } else if (values.newPassword.length < 6) {
        errors.newPassword = "Must be longer than 5 characters";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = "Does not match.";
      }
    } else if (values.newPassword || values.confirmPassword) {
      errors.oldPassword = "Required";
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
          <h3 className="text-center">Change Password</h3>
          <hr className="hr" />
          <Alerts setAlerts={setAlerts} {...alerts} />
          <Field
            name="oldPassword"
            label="Old Password"
            type="password"
            component={FormField}
          />
          <Field
            disabled={!values.oldPassword}
            name="newPassword"
            label="New Password"
            type="password"
            component={FormField}
          />
          <Field
            disabled={!values.oldPassword}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
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

export default connect(mapStateToProps)(PersonalInfo);
