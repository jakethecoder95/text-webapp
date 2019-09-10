import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

const StripeCard = props => {
  const submit = async ev => {
    // User clicked submit
  };

  return (
    <div className="checkout">
      <div className="card-container">
        <CardElement />
        <button className="btn btn-outline-light" onClick={submit}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default injectStripe(StripeCard);
