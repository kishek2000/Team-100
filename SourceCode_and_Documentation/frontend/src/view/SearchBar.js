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
  }

  async handleRegionChange(region) {
    // Set region
    this.props.setRegion(region);
    // Set streaming options
    this.props.getServiceOptions(region);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    if (event.target.value === "") {
      this.props.setSearchQuery(event.target.value);
      if (this.props.mediaSelected === "WATCH") {
        this.props.getWatchData();
      } else {
        this.props.getListenData();
      }
    }
  }

  handleSubmit(event) {
    console.log(
      `Query submitted: ${this.state.value}. Media Selected: ${this.mediaSelected}. Services Filtered: ${this.props.serviceSelections}`
    );
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
      <form className="filter-form" onSubmit={this.handleSubmit}>
        {this.props.mediaSelected === "WATCH" ? (
          <div className="filter-form">
            <div className="filter-text">Filter Search by:</div>
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
            />
            <Dropdown
              options={this.props.serviceOptions}
              placeholder="Streaming Service..."
              setData={this.props.setServiceSelections}
              class="services-filter"
              isMulti={true}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className={this.props.name}>
          <img
            src="https://img.icons8.com/android/24/000000/search.png"
            className={this.props.imagename}
            alt="searchIcon"
          ></img>
          <input
            className={this.props.inputname}
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.handleChange}
            // onChange={evt => console.log(evt.currentTarget.value)}
          ></input>
        </div>
        <input type="submit" className="hide-this"></input>
      </form>
    );
  }
}
