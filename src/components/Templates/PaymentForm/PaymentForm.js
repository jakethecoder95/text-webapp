import "./PaymentForm.scss";
import React, { useState } from "react";

import Stripe from "../Stripe/Stripe";

const PaymanetForm = props => {
  const [value, setValue] = useState(5);

  return (
    <div className="payment-form">
      <h3>How much would you like to put in your bucket?</h3>
      <div className="choose-value-wrapper">
        <div className="choose-value">
          <div className="value">${value}</div>
          <div className="inc-or-dec">
            <button className="inc" onClick={() => setValue(value + 1)}>
              <p className="fa fa-caret-up"></p>
            </button>
            <button
              className="dec"
              onClick={() => setValue(value - 1)}
              disabled={value <= 5}
            >
              <p className="fa fa-caret-down"></p>
            </button>
          </div>
        </div>
        <div className="choose-value-desctiption">
          <ul>
            <li>Minimum of $5 payments</li>
            <li>Your account will be disabled if it goes under $1</li>
            <li>
              Money will be automatically taken out every month for your phone
              number bill.
            </li>
          </ul>
        </div>
      </div>
      <Stripe />
    </div>
  );
};

export default PaymanetForm;
