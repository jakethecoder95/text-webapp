import "./global.scss";
import React from "react";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <div className="logo">
        Group<span>Text</span>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
