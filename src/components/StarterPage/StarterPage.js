import "./StarterPage.scss";
import React, { useState } from "react";

import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import CircleGridGridPage from "../Templates/CircleBgPage/CircleBgGridPage/CircleBgGridPage";

const StarterPage = () => {
  const [hasAccount, setHasAccount] = useState(false);

  const renderContent = () => {
    if (!hasAccount) {
      return <Signup />;
    }
    return <Login />;
  };

  return (
    <CircleGridGridPage
      iconClass="fa-commenting"
      message="Better Communication."
    >
      <div className="starter-page">
        <div className="navigation starter-page__nav">
          <div
            onClick={() => setHasAccount(false)}
            className={!hasAccount ? "active" : ""}
          >
            Signup
          </div>
          <div
            onClick={() => setHasAccount(true)}
            className={hasAccount ? "active" : ""}
          >
            Login
          </div>
        </div>
        <div className="starter-page__content">{renderContent()}</div>
      </div>
    </CircleGridGridPage>
  );
};

export default StarterPage;
