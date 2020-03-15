import "./UploadInput.scss";
import React, { useState } from "react";
import { connect } from "react-redux";

import Spinner from "../../../Loading/Spinner";
import uploadService from "../uploadService";
import { UPDATE_GROUP } from "../../../../redux/types";

function UploadInput({ show, hide, groupId, updateGroup, setAlerts }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Select a CSV File");
  const [sending, setSending] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    try {
      if (!file) {
        throw new Error("You have to choose a file");
      }
      file.append("groupId", groupId);
      const response = await uploadService(file);
      updateGroup(response.group);
      hide();
      setAlerts(
        response.peopleAdded
          ? { success: `Winning! ${response.peopleAdded} new people added.` }
          : { warning: "No new people found." }
      );
    } catch (err) {
      if (err.status === 422) {
        setAlerts({ error: err.message });
      } else if (err.status === 500)
        setAlerts({
          error: "500 Error: Oops! Looks like we had an issue with that file."
        });
      else {
        setAlerts({ warning: err.message });
      }
    }
    setFile(null);
    setFileName("Select a CSV File");
    setSending("");
  };

  const onFileChange = (fl, name) => {
    const lowerCaseRegex = /.csv/;
    const upperCaseRegex = /.CSV/;
    if (!lowerCaseRegex.test(name) && !upperCaseRegex.test(name)) {
      setErrorMessage("Must be a .csv or .CSV file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", fl[0]);
    setFile(formData);
    setFileName(name);
    setErrorMessage();
  };

  const onCancel = () => {
    setFile(null);
    setFileName("Select a CSV File");
    setErrorMessage("");
    hide();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`group-upload-form ${show ? "show" : ""}`}
    >
      <div className="group-upload-form_top">
        <div>
          <h2>Select a File</h2>
          <p>We only accept .csv files.</p>
        </div>
        {sending && <Spinner />}
      </div>
      <div className="custom-file">
        <input
          type="file"
          id="customFile"
          accept=""
          onChange={e => onFileChange(e.target.files, e.target.value)}
          disabled={sending}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {fileName}
        </label>
        <p className="text-danger">{errorMessage}</p>
      </div>
      <button
        type="submit"
        className="btn btn-info"
        disabled={!file || sending}
      >
        Upload File
      </button>
      <button type="button" className="btn btn-danger" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(null, mapDispatchToProps)(UploadInput);
