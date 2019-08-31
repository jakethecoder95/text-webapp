import "./NoGroupPage.scss";
import React from "react";
import { Link } from "react-router-dom";

const NoGroupPage = props => (
  <div className="no-group-page">
    <div className="no-group_background"></div>
    <div className="no-group_content">
      <div className="no-group_message">
        <h1 className="display-4">
          <b>Welcome!</b>
        </h1>
        <p className="lead">
          There is just a few more simple steps to get you set up and make all
          your texting dreams come true.
        </p>
        <ol>
          <li>Signup for a group</li>
          <li>Get a phone number</li>
          <li>Add some people to your group</li>
        </ol>
        <p>
          And Boom! Your all set. Make sure you tell people they can text 1 and
          their name (Ex: "1 Joe Shmo") to your number to opt in to your group
          and 2 at any time to opt out.
        </p>
        <hr className="hr" />
        <p>
          First things first, lets get you a group. Click below to create a
          group.
        </p>
        <Link
          className="btn btn-primary btn-lg"
          to="/group/add-group"
          role="button"
        >
          Add a Group
          <i className="fa fa-chevron-right" />
        </Link>
      </div>
    </div>
    <div className="no-group_icon">
      <div className="slogan-and-icon">
        <i className="fa fa-share-alt"></i>
        <h1>
          Better <br /> Communication.
        </h1>
      </div>
    </div>
  </div>
);

export default NoGroupPage;
