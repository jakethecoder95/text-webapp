import React, { useState } from "react";
import { connect } from "react-redux";
import store from "store";

import PaymentForm from "../../../../Templates/PaymentForm/PaymentForm";
import Alerts from "../../../Group/Alerts/Alerts";
import server from "../../../../../api/server";
import { UPDATE_GROUP } from "../../../../../redux/types";
import Spinner from "../../../../Loading/Spinner";

const UpdatePaymentPlan = ({ group, updateGroup }) => {
  const [amount, setAmount] = useState(group.monthlySms.pay);
  const [submitting, setSubmitting] = useState(false);
  const [alerts, setAlerts] = useState({});

  const onSubmit = async () => {
    setSubmitting(true);
    const authString = `Bearer ${store.get("token")}`;
    try {
      const response = await server.post(
        "/group/update-payment-plan",
        { groupId: group._id, amount },
        { headers: { Authorization: authString } }
      );
      setAlerts({ success: "Update successfully." });
      updateGroup(response.data.group);
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h4>Your Plan</h4>
      <PaymentForm amount={amount} onAmountChange={setAmount} />
      <button
        className="btn btn-primary"
        disabled={amount === group.monthlySms.pay || submitting}
        onClick={onSubmit}
      >
        {submitting ? <Spinner /> : "Update"}
      </button>
      <Alerts alerts={alerts} setAlerts={setAlerts} />
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: UPDATE_GROUP, payload: group })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePaymentPlan);
