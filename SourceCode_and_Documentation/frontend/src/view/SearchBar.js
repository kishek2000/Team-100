import React from "react";
import { Dropdown } from "./Dropdown";

// This is the search bar component. Provide it specified class names for one
// of the two main styles. Either menu, or normal.
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", serviceOptions: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  async handleRegionChange(region) {
    // Set region
    this.props.setRegion(region);
    // Set streaming options
    this.props.getServiceOptions(region);
  }

  clearSearch(doClear) {
    if (doClear) {
      this.props.setSearchQuery("");
      this.setState({ value: "" });
      if (this.props.mediaSelected === "WATCH") {
        this.props.getWatchData();
      } else {
        this.props.getListenData();
      }
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value === "") {
      this.clearSearch(true);
    }
  }

  handleSubmit(event) {
    this.props.onSearchQuery(
      this.state.value,
      this.props.mediaSelected,
      this.props.serviceSelections
    );
    this.props.setSearchQuery(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <div className="search-filter-form">
          {this.props.mediaSelected === "WATCH" ? (
            <div className="search-filter-row" onClick={this.openExpand}>
              <Dropdown
                options={[
                  { value: "AU", label: "Australia" },
                  { value: "US", label: "America" },
                ]}
                placeholder="Region..."
                class="region-filter"
                setData={this.handleRegionChange}
                default={{ value: "AU", label: "Australia" }}
                isMulti={false}
                // styles={{
                //   control: (base) => ({
                //     ...base,
                //     height: 28,
                //     minHeight: 28,
                //   }),
                // }}
              />
              <Dropdown
                options={this.props.serviceOptions}
                placeholder="Streaming Service..."
                setData={this.props.setServiceSelections}
                class="services-filter"
                isMulti={true}
                // styles={{
                //   control: (base) => ({
                //     ...base,
                //     height: 28,
                //     minHeight: 28,
                //   }),
                // }}
              />
            </div>
          ) : (
            <div></div>
          )}

          <div
            className={`${this.props.name} ${this.props.expandSearch}`}
            onClick={() => {
              this.props.setExpandSearch(true);
            }}
          >
            <input
              className={this.props.inputname}
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
            <div className="execute-search" onClick={this.handleSubmit}>
              <img
                src="https://img.icons8.com/android/24/000000/search.png"
                className={this.props.imagename}
                alt="searchIcon"
                onClick={this.handleSubmit}
              ></img>
            </div>
          </div>
          <input type="submit" className="hide-this"></input>
          {this.props.searchQuery.length > 0 && (
            <div className="relative">
              <div
                className="clear-search"
                onClick={() => {
                  this.clearSearch(true);
                }}
              >
                Clear
              </div>
            </div>
          )}
        </div>
      </form>
    );
  }
}
