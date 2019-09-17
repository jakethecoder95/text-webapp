import "./ChooseNumberForm.scss";
import React from "react";
import { connect } from "react-redux";

import SearchBar from "./SearchBar/SearchBar";
import NumberList from "./NumberList/NumberList";
import searchNumber from "./searchNumber";

/* This Component finds twilio numbers associated with the users search.
 * The user can search by phone number near a give number, post codes, and area codes.
 *
 * @prop selectedNumber  IMPORTANT: This is an empty string value that must
 *                                  be controller by the parent
 */
class ChooseNumberForm extends React.Component {
  state = {
    loading: true,
    numbers: [],
    searchType: "nearNumber",
    searchValue: "",
    numberSelected: null,
    error: null
  };

  async componentDidMount() {
    const response = await searchNumber(
      this.state.searchType,
      this.state.searchValue
    );
    if (!response.numbers) {
      this.setState({ error: response.message });
    }
    this.setState({
      loading: false,
      numbers: response.numbers || [],
      searchValue: this.props.userPhoneNumber
    });
  }

  handleSearchValueChange = value => this.setState({ searchValue: value });

  handleSearchTypeChange = value => {
    this.setState({ searchValue: "" });
    this.setState({ searchType: value });
  };

  handleSearchSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    const response = await searchNumber(
      this.state.searchType,
      this.state.searchValue
    );
    if (!response.numbers) {
      return this.setState({ error: response.message });
    }
    this.setState({
      loading: false,
      numbers: response.numbers
    });
  };

  render() {
    const { loading, numbers, searchType, searchValue } = this.state;
    const {
      selectedNumber,
      handleNumberSelected,
      handleNumberSubmit
    } = this.props;

    return (
      <div>
        <SearchBar
          searchType={searchType}
          value={searchValue}
          onValueChange={this.handleSearchValueChange}
          onSearchTypeChange={this.handleSearchTypeChange}
          onSubmit={this.handleSearchSubmit}
        />
        <NumberList
          numbers={numbers}
          loading={loading}
          selectedNumber={selectedNumber}
          onSelect={handleNumberSelected}
          error={this.state.error}
        />
        <button
          className="btn btn-primary submit-btn"
          disabled={!selectedNumber}
          onClick={handleNumberSubmit}
        >
          Submit Number!
        </button>
        <span className="selected-number-preview">{selectedNumber}</span>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userPhoneNumber: user.phoneNumber
});

export default connect(mapStateToProps)(ChooseNumberForm);
