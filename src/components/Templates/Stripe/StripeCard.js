import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

const StripeCard = props => {
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    setSubmitted(true);
    const { token } = await props.stripe.createToken({ name: "Subscribe" });
    props.onSubmit(token);
  };

  return (
    <div className="checkout">
      <div className="card-container">
        <CardElement />
        <button
          className="btn btn-outline-light"
          onClick={submit}
          disabled={submitted}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default injectStripe(StripeCard);
