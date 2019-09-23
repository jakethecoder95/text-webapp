import "./PaymentMethod.scss";
import React from "react";
import { connect } from "react-redux";
import store from "store";

import server from "../../../../../api/server";
import Spinner from "../../../../Loading/Spinner";
import Stripe from "../../../../Templates/Stripe/Stripe";

const authString = `Bearer ${store.get("token")}`;

class PaymentMethod extends React.Component {
  state = { card: null, selectChange: false };

  componentDidMount() {
    this.fetchGroupCard();
  }

  fetchGroupCard = async () => {
    try {
      const response = await server.get("/group/fetch-card", {
        headers: { Authorization: authString },
        params: { groupId: this.props.group._id }
      });
      this.setState({ card: response.data.card });
    } catch (err) {
      console.log(err);
    }
  };

  onSubmit = async token => {
    const { card } = this.state;
    try {
      await server.post(
        "/group/update-card",
        {
          stripeToken: token.id,
          stripeCustomerId: card.customer,
          oldCardId: card.id
        },
        { headers: { Authorization: authString } }
      );
      this.setState({ card: null });
      this.fetchGroupCard();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { card, selectChange } = this.state;
    return (
      <div className="group-settings__payment">
        <h4>Card</h4>

        <div className="form-row">
          <div className="col-9">
            {card ? (
              <div className="form-control">
                <span>{card.brand.toUpperCase()}</span>
                <span>•••• {card.last4}</span>
                <span>
                  {card.exp_month < 10 ? "0" + card.exp_month : card.exp_month}{" "}
                  / {card.exp_year}
                </span>
              </div>
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ selectChange: !selectChange })}
            >
              {selectChange ? "Cancel" : "Change"}
            </button>
          </div>
        </div>
        <div className={`stripe-card ${!selectChange ? "collapse" : ""}`}>
          <Stripe onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ group }) => ({
  group: group.activeGroup
});

export default connect(mapStateToProps)(PaymentMethod);
