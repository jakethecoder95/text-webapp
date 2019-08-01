import React from "react";

const Person = ({ person }) => {
  return (
    <li className="person">
      <div className="person__name">{person.name}</div>
      <div className="person__number">{person.number}</div>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => console.log("deleteing!")}
      >
        <span aria-hidden="true" className="x">
          &times;
        </span>
      </button>
    </li>
  );
};

export default Person;
