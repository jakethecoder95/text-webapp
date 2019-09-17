import React from "react";

const Disclaimer = ({ amount }) => (
  <div>
    <ul>
      <li>
        By entering in your bank info you are starting a monthly subscription of
        ${amount} per month.
      </li>
      <li>
        Funds will automatically be taken out of your account every month.
      </li>
      <li>You may cancel this subscription any time.</li>
      <li>You may also change your monthly fee at any time.</li>
      <li>Minimum of $3 monthly fee.</li>
    </ul>
  </div>
);

export default Disclaimer;
