import React from "react";
import { connect } from "react-redux";

const Overview = props => {
  const textsAmt = Math.floor(props.message.length / 160) + 1;
  const price = textsAmt * 75 * props.people.length * 0.0001;
  console.log(textsAmt);

  return (
    <div
      className="text-center"
      style={{ maxWidth: "350px", margin: "1rem auto" }}
    >
      <h4>Total</h4>
      <h1>${price}</h1>
      <p>
        Your sending {textsAmt} text{textsAmt > 1 ? "s" : ""} to{" "}
        {props.people.length} people
      </p>
      <div className="form-group">
        <input
          className="form-control text-center"
          value={props.password}
          onChange={e => props.onPasswordChange(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ group }) => ({
  people: new Array(50)
});

export default connect(mapStateToProps)(Overview);
