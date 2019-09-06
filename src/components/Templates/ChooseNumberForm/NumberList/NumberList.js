import "./NumberList.scss";
import React from "react";
import ReactDOM from "react-dom";

import Spinner from "../../../Loading/Spinner";

class NumberList extends React.Component {
  state = { scrolledTop: true, scrolledBottom: true };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.DOMRef = ReactDOM.findDOMNode(this);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    const { scrollTop, scrollHeight, offsetHeight } = this.DOMRef;
    const isBottom = scrollTop === scrollHeight - offsetHeight;
    if (this.state.scrolledBottom && !isBottom) {
      this.setState({ scrolledBottom: false });
    }
    if (!this.state.scrolledBottom && isBottom) {
      this.setState({ scrolledBottom: true });
    }
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    this.setState({
      scrolledTop: scrollTop === 0,
      scrolledBottom: scrollTop === scrollHeight - offsetHeight
    });
  };

  renderContent = () => {
    const { numbers, loading, onSelect, selectedNumber, error } = this.props;
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

  render() {
    const { loading, error } = this.props;
    const shaddowBottomVisibility =
      !this.state.scrolledBottom && !loading && !error ? "visible" : "hidden";

    return (
      <>
        {!this.state.scrolledTop > 0 && <div className="shadow-top"></div>}
        <ul className="number-list scrollbar">{this.renderContent()}</ul>
        <div
          className="shadow-bottom"
          style={{ visibility: shaddowBottomVisibility }}
        />
      </>
    );
  }
}

export default NumberList;
