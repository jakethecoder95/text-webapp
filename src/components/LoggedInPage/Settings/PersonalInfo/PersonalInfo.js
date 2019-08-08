import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import store from "store";

import FormField from "../../../StarterPage/FormField/FormField";
import isEmail from "../../../../util/validateEmail";
import server from "../../../../api/server";
import Alerts from "../Alerts";
import { UPDATE_GROUP } from "../../../../redux/types";

const PersonalInfo = props => {
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
      props.updateSettings(response.data.group);
      setAlerts({ error: null, success: "Updated Successfully" });
      setAsyncError({});
    } catch (err) {
      if (err.response) {
        setAlerts({ success: null, error: err.response.data.message });
        setAsyncError(err.response.data);
      }
      console.log(err.response);
    }
    setSubmitting(false);
  };

  const validate = values => {
    const errors = {};

    if (asyncError) {
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
      initialValues={{ name: props.group.name, email: props.group.email }}
      render={({ handleSubmit, pristine, invalid, form }) => (
        <form onSubmit={handleSubmit} className="settings__form">
          <h2 className="text-center">Your Personal Info</h2>
          <hr className="hr" />
          <Alerts setAlerts={setAlerts} {...alerts} />
          <Field name="email" label="Email" component={FormField} />
          <Field name="name" label="Name" component={FormField} />

          <h4 className="text-center">Change Password</h4>
          <Field
            name="oldPassword"
            label="Old Password"
            type="password"
            component={FormField}
          />
          <Field
            name="newPassword"
            label="New Password"
            type="password"
            component={FormField}
          />
          <Field
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

const mapStateToProps = ({ group }) => ({
  group
});

const mapDispatchToProps = dispatch => ({
  updateSettings: newGroup =>
    dispatch({ type: UPDATE_GROUP, payload: newGroup })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInfo);
