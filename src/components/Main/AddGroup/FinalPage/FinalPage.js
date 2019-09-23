import "./FinalPage.scss";
import React, { useState } from "react";

import PaymentForm from "../../../Templates/PaymentForm/PaymentForm";
import Stripe from "../../../Templates/Stripe/Stripe";
import Disclaimer from "./Disclaimer";
import PurchaseSummary from "./PurchaseSummary";

const FinalPage = ({ name, number, handleSubmit, errorMessage }) => {
  const [amount, setAmount] = useState(5);

  const onSubmit = stripeToken => handleSubmit(amount, stripeToken);
  const renderErrorMessage = () => {
    if (!errorMessage) {
      return null;
    }
    return <div className="alert alert-danger">{errorMessage}</div>;
  };

  return (
    <div className="final-page">
      <h3>Choose your plan</h3>
      <hr className="hr"></hr>
      <PaymentForm onAmountChange={setAmount} amount={amount} />
      <Disclaimer amount={amount} />
      <hr className="hr" />
      <PurchaseSummary name={name} number={number} amount={amount} />
      {renderErrorMessage()}
      <Stripe onSubmit={onSubmit} />
    </div>
  );
};

export default FinalPage;
