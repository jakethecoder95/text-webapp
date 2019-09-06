import "./AddGroup.scss";
import React, { useState } from "react";

import NameForm from "./NameForm/NameForm";
import ChooseNumberForm from "../../Templates/ChooseNumberForm/ChooseNumberForm";
import FinalPage from "./FinalPage/FinalPage";

const AddGroup = props => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [onStep, setOnStep] = useState(1);

  return (
    <div className="page-content container add-group">
      {onStep === 1 && (
        <NameForm
          name={name}
          handleNameChange={setName}
          handleNameSubmit={() => setOnStep(2)}
        />
      )}
      {onStep === 2 && (
        <ChooseNumberForm
          selectedNumber={number}
          handleNumberSelected={setNumber}
          handleNumberSubmit={() => setOnStep(3)}
        />
      )}
      {onStep === 3 && <FinalPage name={name} number={number} />}
    </div>
  );
};

export default AddGroup;
