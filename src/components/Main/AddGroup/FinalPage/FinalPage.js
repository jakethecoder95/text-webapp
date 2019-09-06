import "./FinalPage.scss";
import React from "react";

const FinalPage = ({ name, number }) => {
  return (
    <div className="final-page">
      <h1 className="text-center">Comfirm</h1>
      <div className="final-page-headers">
        <p>1) Group Name: {name}</p>
      </div>
      <div className="final-page-headers">
        <p>2) Group Number: {number}</p>
        <div className="cost-div text-right">
          <p>
            $2.00
            <span> / monthly</span>
          </p>
        </div>
      </div>
      <div className="text-right">Total: $2.00</div>
    </div>
  );
};

export default FinalPage;
