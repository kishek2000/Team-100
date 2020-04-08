import React from "react";

// This is the search bar component. Provide it specified class names for one
// of the two main styles. Either menu, or normal.
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log("you submitted: " + this.state.value);
    this.props.onSearchQuery(this.state.value, this.props.mediaSelected);
    this.props.setSearchQuery(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className={this.props.name} onSubmit={this.handleSubmit}>
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
        <input type="submit" className="hide-this"></input>
      </form>
    );
  }
}
