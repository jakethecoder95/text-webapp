import "./Bucket.scss";
import React from "react";
import { connect } from "react-redux";

import Spinner from "../../Loading/Spinner";

const Bucket = ({ bucket }) => {
  const budgetDetails = () => {
    if (!bucket.name) {
      return <Spinner />;
    }
    return (
      <>
        <div className="bucket-amount">${bucket.amount.toFixed(3)}</div>
        <div className="bucket-name">{bucket.name}</div>
      </>
    );
  };

  return (
    <>
      <div className="bucket-wrapper">
        <div className="bucket-icon">
          <i className="fa fa-bitbucket" />
        </div>
        <div className="bucket-details">{budgetDetails()}</div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  bucket: {}
});

export default connect(mapStateToProps)(Bucket);
