import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import store from "store";

import FormField from "../../../StarterPage/FormField/FormField";
import isPhoneNumber from "../../../../util/validatePhone";
import Alerts from "../Alerts";
import server from "../../../../api/server";
import { UPDATE_GROUP } from "../../../../redux/types";

const NexmoInfo = props => {
  const [submitting, setSubmitting] = useState(false);
  const [alerts, setAlerts] = useState({ error: null, success: null });
  const [asyncError, setAsyncError] = useState([]);

  const onSubmit = async info => {
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/manage/update-nexmo-settings",
        { ...info },
        { headers: { Authorization: authString } }
      );
      props.updateSettings(response.data.group);
      setAlerts({ error: null, success: "Updated Successfully" });
      setAsyncError([]);
    } catch (err) {
      if (err.response) {
        setAlerts({ success: null, error: err.response.data.message });
        if (err.response.data.data) {
          setAsyncError(err.response.data.data);
        }
      }
      console.log(err.response);
    }
    setSubmitting(false);
  };

  const validate = values => {
    const errors = {};

    // Express validator errors
    asyncError.forEach(err => {
      if (values[err.param] === err.value) {
        errors[err.param] = err.msg;
      }
    });

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

  return (
    <Form
      initialValues={{
        nexmoNumber: props.group.nexmoNumber,
        secretKey: props.group.secretKey,
        apiKey: props.group.apiKey
      }}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit} className="settings__form">
          <h2 className="text-center">Your Nexmo Info</h2>
          <hr className="hr" />

          <Alerts setAlerts={setAlerts} {...alerts} />

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
            toggleablePswField
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
  group: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  updateSettings: newGroup =>
    dispatch({ type: UPDATE_GROUP, payload: newGroup })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NexmoInfo);
