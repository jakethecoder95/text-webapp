import "./FormField.scss";
import React from "react";

const FormField = ({
  input,
  meta,
  label,
  type,
  disabled,
  toggleablePswField
}) => (
  <div className="form-group">
    {label && (
      <label>
        {label}
        {meta.touched && meta.error && (
          <span style={{ color: "red", marginLeft: "15px" }}>
            * {meta.error}
          </span>
        )}
      </label>
    )}
    <input
      type={type ? type : "text"}
      {...input}
      placeholder={label}
      className="form-control"
      disabled={disabled}
    />
    {toggleablePswField && (
      <span
        toggle="#password-field"
        className="fa fa-fw fa-eye field-icon toggle-password"
        onClick={e => {
          const input = e.target.parentElement.children[1];
          if (input.type === "password") {
            input.type = "text";
            e.target.classList.toggle("fa-eye-slash");
          } else {
            input.type = "password";
            e.target.classList.toggle("fa-eye-slash");
          }
        }}
      />
    )}
  </div>
);

export default FormField;
