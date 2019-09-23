import "./Stripe.scss";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import StripeCard from "./StripeCard";

const Stripe = ({ onSubmit }) => {
  return (
    <StripeProvider apiKey="pk_live_gKMLeNNHVIAvTv3CSNdlCsfV">
      <Elements>
        <StripeCard onSubmit={onSubmit} />
      </Elements>
    </StripeProvider>
  );
};

export default Stripe;
