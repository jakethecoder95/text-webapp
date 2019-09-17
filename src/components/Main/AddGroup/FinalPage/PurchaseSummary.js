import React from "react";

const PurchaseSummary = ({ name, number, amount }) => (
  <div className="final-page_summary">
    <p>
      Name: <span>{name}</span>
    </p>
    <p>
      Number: <span>{number}</span>
    </p>
    <p>
      Texts per/month: <span>{Math.floor((amount - 1.3) / 0.008)}</span>
    </p>
    <p>
      Monthly Fee: <span>${amount}.00</span>
    </p>
  </div>
);

export default PurchaseSummary;
