import "./Stripe.scss";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import StripeCard from "./StripeCard";

const Stripe = ({ amount, onSubmit }) => {
  return (
    <StripeProvider apiKey="pk_test_HMVX8wk4i8eY9ai8MvI4DRej">
      <Elements>
        <StripeCard amount={amount} onSubmit={onSubmit} />
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
