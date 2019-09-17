import "./ChoosePaymentAmount.scss";
import React from "react";

const ChoosePaymentAmount = ({ amount, onAmountChange }) => (
  <div className="choose-value">
    <div className="value">${amount}</div>
    <div className="inc-or-dec">
      <button className="inc" onClick={() => onAmountChange(amount + 1)}>
        <p className="fa fa-caret-up"></p>
      </button>
      <button
        className="dec"
        onClick={() => onAmountChange(amount - 1)}
        disabled={amount <= 3}
      >
        <p className="fa fa-caret-down"></p>
      </button>
    </div>
  </div>
);

export default ChoosePaymentAmount;
