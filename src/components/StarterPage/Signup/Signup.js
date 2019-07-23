import "./Signup.scss";
import React from "react";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="signup page-contents starter-page__form">
      <SignupForm />
      <p>
        <a
          href="https://github.com/jakethecoder95/text-webapp#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center link signup-link"
        >
          What is Nexmo and how does this stuff work???
        </a>
      </p>
    </div>
  );
};

export default Signup;
