import "./GroupInfo.scss";
import React from "react";

import ChangeNameForm from "./ChangeNameForm";
import ActiveGroup from "./ActiveGroup";
import Admins from "./Admins/Admins";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import UpdatePaymentPlan from "./UpdatePaymentPlan/UpdatePaymentPlan";
import DeleteGroup from "../DeleteGroup/DeleteGroup";

const GroupInfo = props => {
  return (
    <div className="page-content container group-info">
      <ActiveGroup />
      <hr className="hr" />
      <div className="group-info__fields">
        <ChangeNameForm />
        <PaymentMethod />
        <Admins />
        <UpdatePaymentPlan />
      </div>
      <DeleteGroup />
    </div>
  );
};

export default GroupInfo;
