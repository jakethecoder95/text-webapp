import React from "react";
import ReactDOM from "react-dom";

class ScrollableListShadow extends React.Component {
  state = { scrolledTop: true, scrolledBottom: true };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.DOMRef = ReactDOM.findDOMNode(this.refs[0]);
    this.DOMRef.dispatchEvent(new CustomEvent("scroll"));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    const { scrollTop, scrollHeight, offsetHeight } = this.DOMRef;
    const isBottom = scrollTop === scrollHeight - offsetHeight;
    if (this.state.scrolledBottom && !isBottom) {
      this.setState({ scrolledBottom: false });
    }
    if (!this.state.scrolledBottom && isBottom) {
      this.setState({ scrolledBottom: true });
    }
    if (!prevProps.startBottom && this.props.startBottom)
      this.DOMRef.scrollTop = this.props.startBottom
        ? this.DOMRef.scrollHeight
        : this.DOMRef.scrollTop;
  }

  handleScroll = e => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    this.setState({
      scrolledTop: scrollTop === 0,
      scrolledBottom: scrollTop === scrollHeight - offsetHeight
    });
  };

  render() {
    const children = React.Children.map(this.props.children, (element, idx) => {
      return React.cloneElement(element, { ref: idx });
    });
    const shaddowBottomVisibility = !this.state.scrolledBottom
      ? "visible"
      : "hidden";
    return (
      <>
        {!this.state.scrolledTop > 0 && <div className="shadow-top"></div>}
        <div style={{ paddingBottom: "20px" }}>{children}</div>
        <div
          className="shadow-bottom"
          style={{ visibility: shaddowBottomVisibility }}
        />
      </>
    );
  }
}

export default ScrollableListShadow;
