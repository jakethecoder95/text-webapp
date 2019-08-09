import React from "react";

const FormField = ({ input, meta, label, type, disabled }) => (
  <div className="form-group">
    <label>
      {label}
      {meta.touched && meta.error && (
        <span style={{ color: "red", marginLeft: "15px" }}>* {meta.error}</span>
      )}
    </label>
    <input
      type={type ? type : "text"}
      {...input}
      placeholder={label}
      className="form-control"
      disabled={disabled}
    />
  </div>
);

export default FormField;
