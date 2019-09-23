import "./AddGroup.scss";
import React, { useState } from "react";
import store from "store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import server from "../../../api/server";
import NameForm from "./NameForm/NameForm";
import ChooseNumberForm from "../../Templates/ChooseNumberForm/ChooseNumberForm";
import FinalPage from "./FinalPage/FinalPage";
import { INIT_GROUP } from "../../../redux/types";
import Success from "../../Templates/Success/Success";
import Spinner from "../../Loading/Spinner";
import ProgressNav from "./ProgressNav/ProgressNav";

const AddGroup = props => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [onStep, setOnStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setsubmitting] = useState(false);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  const handleSubmit = async (amount, token) => {
    setsubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    setErrorMessage(null);
    try {
      const response = await server.post(
        "/group/create-group",
        { tokenId: token.id, subscriptionAmount: amount, name, number },
        { headers: { Authorization: authString } }
      );
      props.initGroup({
        ...props.group,
        activeGroup: response.data.group,
        groups: props.group.groups.push(response.data.group._id)
      });
      setSubmitSuccessful(true);
    } catch (err) {
      if (err.response) {
        const message = `${err.response.status} Error: ${err.response.data.message}`;
        setErrorMessage(message);
      }
      console.log(err);
    }
    setsubmitting(false);
  };

  if (submitting) {
    return <Spinner size="large" />;
  }

  if (submitSuccessful) {
    return (
      <Success>
        <div>
          <h1>Success! Group was created</h1>
          <Link to="/" className="action-btn btn btn-success btn-lg">
            Continue
            <i className="action-arrow fa fa-chevron-right" />
          </Link>
        </div>
      </Success>
    );
  }

  return (
    <div className="page-content container add-group">
      <ProgressNav onStep={onStep} setOnStep={setOnStep} />
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
        <FinalPage
          name={name}
          number={number}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  initGroup: group => dispatch({ type: INIT_GROUP, payload: group })
});

const mapStateToProps = ({ group }) => ({
  group
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddGroup);
