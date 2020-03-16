import "./NumberList.scss";
import React from "react";

import Spinner from "../../../Loading/Spinner";
import ScrollableListShadow from "../../ScrollableListShadow/ScrollableListShadow";

const NumberList = ({ numbers, loading, onSelect, selectedNumber, error }) => {
  const renderContent = () => {
    if (error) {
      return <h4 className="alert alert-danger">Error: {error}</h4>;
    }
    if (loading) {
      return <Spinner size="large" />;
    }
    if (numbers.length === 0) {
      return <h4 className="alert alert-dark">No numbers could be found</h4>;
    }
    return numbers.map((num, i) => {
      const classList = `number ${
        selectedNumber === num.phoneNumber ? "selected" : ""
      }`;
      return (
        <li
          className={classList}
          key={i}
          onClick={() => onSelect(num.phoneNumber)}
        >
          <div className="number__number">{num.phoneNumber}</div>
          <div className="number__locality">{num.locality}</div>
          <div className="number__post-code">{num.postalCode}</div>
        </li>
      );
    });
  };

  return (
    <ScrollableListShadow>
      <ul className="number-list scrollbar">{renderContent()}</ul>
    </ScrollableListShadow>
  );
};

export default NumberList;
