import "./PaymentForm.scss";
import React from "react";

import PaymentDetails from "./PaymentDetails/PaymentDetails";
import ChoosePaymentAmount from "./ChoosePaymentAmount/ChoosePaymentAmount";

const PaymanetForm = ({ amount, onAmountChange }) => {
  return (
    <div className="payment-form">
      <div className="choose-value-wrapper">
        <ChoosePaymentAmount amount={amount} onAmountChange={onAmountChange} />
        <div className="choose-value-desctiption">
          <PaymentDetails amount={amount} />
        </div>
      </div>
    </div>
  );
};

export default PaymanetForm;
