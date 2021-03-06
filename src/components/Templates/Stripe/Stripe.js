import "./Stripe.scss";
import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import StripeCard from "./StripeCard";

const Stripe = ({ onSubmit }) => {
	const STRIPE_PUB_KEY =
		process.env.NODE_ENV !== "production"
			? "pk_test_rllRW3wqbQCLjJeIcXIaV4Q2"
			: "pk_live_gKMLeNNHVIAvTv3CSNdlCsfV";

	return (
		<StripeProvider apiKey={STRIPE_PUB_KEY}>
			<Elements>
				<StripeCard onSubmit={onSubmit} />
			</Elements>
		</StripeProvider>
	);
};

export default Stripe;
