import "./SearchBar.scss";
import React from "react";

const SearchBar = props => {
  const {
    searchType,
    value,
    onValueChange,
    onSearchTypeChange,
    onSubmit
  } = props;

  let placeholder, maxValue;
  if (searchType === "nearNumber") {
    placeholder = "Number";
    maxValue = 99999999999;
  }
  if (searchType === "inPostalCode") {
    placeholder = "Post Code";
    maxValue = 99999;
  }
  if (searchType === "areaCode") {
    placeholder = "Area Code";
    maxValue = 999;
  }

  return (
    <div className="search-bar">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-row align-items-center">
            <label className="mr-sm-2">Search By: </label>
            <div className="col-auto my-1">
              <select
                className="form-control custom-select mr-sm-2"
                onChange={e => onSearchTypeChange(e.target.value)}
              >
                <option value="nearNumber">Numbers close to...</option>
                <option value="inPostalCode">Postal code</option>
                <option value="areaCode">Area code</option>
              </select>
            </div>
            <div className="col-auto my-1">
              <div className="mr-sm-2">
                <input
                  type="number"
                  className="form-control"
                  value={value}
                  placeholder={placeholder}
                  min="1"
                  max={maxValue}
                  onChange={e => {
                    if (e.target.value <= maxValue)
                      onValueChange(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-auto my-1">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={value.length === 0}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </nav>
    </div>
  );
};

export default SearchBar;
