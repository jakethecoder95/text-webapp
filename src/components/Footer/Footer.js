import "./Footer.scss";
import React from "react";
import { connect } from "react-redux";

import { SIGN_OUT } from "../../redux/types";

const Footer = props => {
  const style = {
    display: props.isSignedIn ? "grid" : "flex"
  };
  return (
    <footer className="navbar font-small blue">
      <div className="page-footer container" style={style}>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://github.com/jakethecoder95/text-webapp/issues"
            >
              Report Issue
            </a>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://github.com/jakethecoder95/text-webapp#readme"
            >
              Documentation
            </a>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link"
              href="https://github.com/jakethecoder95/text-webapp"
            >
              GitHub
            </a>
          </li>
        </ul>
        <div className="footer-copyright text-center py-3">
          © {new Date().getFullYear()} Copyright:
          <a href="http://crossroadslive.com/"> Crossroads Church</a>
        </div>

        {props.isSignedIn && (
          <div className="footer-btn">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={props.signout}
            >
              {props.isSignedIn ? "Logout" : "Signin"}
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch({ type: SIGN_OUT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
