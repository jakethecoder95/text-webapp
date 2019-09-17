import "./ProgressNav.scss";
import React, { useState } from "react";

const ProgressNav = ({ onStep, setOnStep }) => {
  const [highest, setHighest] = useState(1);

  if (onStep > highest) {
    setHighest(onStep);
  }

  const setClasses = num => {
    let classNames = "";
    if (num === onStep) {
      classNames += " active";
    }
    if (num < highest) {
      classNames += " complete";
    }
    return classNames;
  };

  return (
    <nav className="progress-nav">
      <button
        className={`progress-tab ${setClasses(1)}`}
        onClick={() => setOnStep(1)}
      >
        1) Pick a Name
      </button>
      <button
        className={`progress-tab ${setClasses(2)}`}
        disabled={highest < 2}
        onClick={() => setOnStep(2)}
      >
        2) Find a Number
      </button>
      <button
        className={`progress-tab ${setClasses(3)}`}
        disabled={highest < 3}
        onClick={() => setOnStep(3)}
      >
        3) Confirm & Pay
      </button>
    </nav>
  );
};

export default ProgressNav;
