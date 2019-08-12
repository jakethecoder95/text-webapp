import "./global.scss";
import React from "react";
import { connect } from "react-redux";
import { INIT_APP } from "../redux/types";

import LoggedInPage from "./LoggedInPage/LoggedInPage";
import StarterPage from "./StarterPage/StarterPage";
import Loading from "./Loading/Loading";
import Footer from "./Footer/Footer";

class App extends React.Component {
  componentDidMount() {
    this.props.initApp();
  }

  renderPage = () => {
    if (this.props.isSignedIn === null) {
      return <Loading />;
    }
    if (this.props.isSignedIn === false) {
      return <StarterPage />;
    }
    return <LoggedInPage />;
  };

  render() {
    return (
      <>
        <div className="logo">
          Group<span>Text</span>
        </div>
        <main className="container">{this.renderPage()}</main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isSignedIn: auth.isSignedIn
});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch({ type: INIT_APP })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
