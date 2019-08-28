import React from "react";
import { Link } from "react-router-dom";

const NoGroupPage = props => (
  <div className="page-content text-center">
    <div className="no-people">
      <h2>GROUP EMPTY</h2>
      <h1>
        <i className="fa fa-plus" />
      </h1>
      <Link className="btn btn-primary" to="/group">
        Add Someone
      </Link>
    </div>
  </div>
);

export default NoGroupPage;
