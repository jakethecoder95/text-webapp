import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import store from "store";

import FormField from "../../../StarterPage/FormField/FormField";
import Alerts from "../../Group/Alerts/Alerts";
import server from "../../../../api/server";
import { UPDATE_GROUP } from "../../../../redux/types";

const ChangeNameForm = props => {
  const [submitting, setSubmitting] = useState(false);
  const [alerts, setAlerts] = useState({ error: null, success: null });
  const [asyncError, setAsyncError] = useState([]);

  const onSubmit = async ({ name }) => {
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/manage/update-group-name",
        { newName: name, groupId: props.group._id },
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
    // Async Errors
    asyncError.forEach(err => {
      if (values[err.param] === err.value) {
        errors[err.param] = err.msg;
      }
    });
    // Non Async Errors
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  return (
    <Form
      initialValues={{
        name: props.group.name
      }}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Alerts setAlerts={setAlerts} alerts={alerts} />
          <h4>Group Name</h4>
          <div className="form-row">
            <div className="col-10">
              <Field name="name" component={FormField} />
            </div>
            <div className="col-2">
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
            </div>
          </div>
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
)(ChangeNameForm);
