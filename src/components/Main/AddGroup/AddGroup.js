import "./AddGroup.scss";
import React, { useState } from "react";
import store from "store";

import server from "../../../api/server";
import NameForm from "./NameForm/NameForm";
import ChooseNumberForm from "../../Templates/ChooseNumberForm/ChooseNumberForm";
import FinalPage from "./FinalPage/FinalPage";

const AddGroup = props => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [onStep, setOnStep] = useState(1);

  const handleSubmit = async (amount, token) => {
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/group/create-group",
        { tokenId: token.id, subscriptionAmount: amount, name, number },
        { headers: { Authorization: authString } }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
      console.log(err);
    }
  };

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
      {onStep === 3 && (
        <FinalPage name={name} number={number} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default AddGroup;
