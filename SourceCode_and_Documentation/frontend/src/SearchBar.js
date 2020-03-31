import React from "react";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log("current handlechange value: " + this.state.value);
    this.setState({ value: event.target.value });
    if (event.target.value === "") {
      document.getElementById("media-options-window").style.display = "flex";
    }
  }

  handleSubmit(event) {
    if (this.state.value !== "") {
      document.getElementById("media-options-window").style.display = "none";
      document.getElementById(
        "search-results-window"
      ).innerHTML = `<div class="category-title">Search Keyword: ${this.state.value}</div>`;
      document.getElementById("search-results-window").style.display = "flex";
    }
    console.log("Search Query: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.name}>
        <img
          src="https://img.icons8.com/android/24/000000/search.png"
          className={this.props.imagename}
          alt="searchIcon"
        ></img>
        <input
          className={this.props.inputname}
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" className="hide-this" />
      </form>
    );
  }
}
