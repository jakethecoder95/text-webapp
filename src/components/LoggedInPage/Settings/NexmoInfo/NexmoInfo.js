import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";

import FormField from "../../../StarterPage/FormField/FormField";

const NexmoInfo = props => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = info => {
    setSubmitting(true);

    setSubmitting(true);
  };

  const validate = values => {
    const errors = {};

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

export default connect(mapStateToProps)(NexmoInfo);
