import "./Stripe.scss";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import StripeCard from "./StripeCard";

const Stripe = ({ message }) => {
  return (
    <StripeProvider apiKey="pk_test_HMVX8wk4i8eY9ai8MvI4DRej">
      <Elements>
        <StripeCard />
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
