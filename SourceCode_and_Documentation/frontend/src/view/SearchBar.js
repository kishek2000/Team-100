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
    this.filterHome = this.filterHome.bind(this);
    this.clearGenreFilter = this.clearGenreFilter.bind(this);
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

  clearGenreFilter(doClear) {
    if (doClear) {
      this.props.setMovGenresSelected("");
      this.props.setTVGenresSelected("");
      this.props.getWatchData();
    }
  }

  filterHome(tvGenres, movieGenres) {
    console.log("you submitted the filters of: ", tvGenres, movieGenres);
    if (String(tvGenres).length > 0 || String(movieGenres).length > 0) {
      this.props.getWatchFilteredData(movieGenres, tvGenres);
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
      <form className="filter-form" onSubmit={this.handleSubmit}>
        {this.props.mediaSelected === "WATCH" ? (
          <div className="filter-form">
            <div className="filter-text">
              Filter{" "}
              <Dropdown
                options={[
                  { value: "home", label: "Home" },
                  { value: "search", label: "Search" },
                ]}
                class="filter-choice"
                setData={this.props.setFilterSelected}
                default={{ value: "home", label: "Home" }}
                isMulti={false}
              />{" "}
              by:
            </div>
            {this.props.filterSelected === "search" && (
              <div className="search-filter-row">
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
            )}
            {this.props.filterSelected === "home" && (
              <div className="home-filter-row">
                <Dropdown
                  options={this.props.movieGenreOptions}
                  placeholder="Movie Genres..."
                  setData={this.props.setMovGenresSelected}
                  class="movie-genres-filter"
                  isMulti={true}
                />
                <Dropdown
                  options={this.props.tvGenreOptions}
                  placeholder="TV Genres..."
                  setData={this.props.setTVGenresSelected}
                  class="tv-genres-filter"
                  isMulti={true}
                />
                <div
                  className="filter-home-button"
                  onClick={() => {
                    this.filterHome(
                      this.props.tvGenresSelected,
                      this.props.movGenresSelected
                    );
                  }}
                >
                  Go
                </div>
                <div
                  className="filter-home-button"
                  onClick={() => {
                    this.clearGenreFilter(true);
                  }}
                >
                  Clear
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div className={this.props.name}>
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
      </form>
    );
  }
}
