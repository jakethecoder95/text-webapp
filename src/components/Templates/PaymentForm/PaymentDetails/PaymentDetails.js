import "./PaymentDetails.scss";
import React, { useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const PaymentDetails = ({ amount }) => {
  const smsLimit = Math.floor((amount - 1.3) / 0.008);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const popover = (
    <Popover>
      <Popover.Title as="h3">
        <span style={{ color: "black" }}>
          Here is the math that going on here!
        </span>
      </Popover.Title>
      <Popover.Content>
        <p>
          Take away $1.30 for the phone bill.
          <br />
          <strong>
            {amount} - 1.30 = {amount - 1.3}
          </strong>
        </p>
        <p>
          Then divide that number by the price for individual texts, $0.008.
          <br />
          <strong>
            {amount - 1.3} ÷ 0.008 = {smsLimit}
          </strong>
        </p>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="payment-details">
      <span className="final-amount">{smsLimit}</span>texts per/month
      <OverlayTrigger
        target={target.current}
        show={show}
        placement="right"
        overlay={popover}
      >
        <div className="info">
          <i
            className="fa fa-question-circle"
            ref={target}
            onClick={() => setShow(!show)}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default PaymentDetails;
