import "./NoGroupPage.scss";
import React from "react";
import { Link } from "react-router-dom";

import CircleBgGridPage from "../Templates/CircleBgPage/CircleBgGridPage/CircleBgGridPage";

const NoGroupPage = props => (
  <CircleBgGridPage iconClass="fa-share-alt" message="Better Communication.">
    <div>
      <h1 className="display-4">
        <b>Almost There!</b>
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
        their name (Ex: "1 Joe Shmo") to your number to opt in to your group and
        2 at any time to opt out.
      </p>
      <hr className="hr" />
      <p>
        First things first, lets get you a group. Click below to create a group.
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
  </CircleBgGridPage>
);

export default NoGroupPage;
