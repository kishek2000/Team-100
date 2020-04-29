/* 
  This is the dropdown that is in every watch list, to filter the list by genre. The filter capability could slowly be expanded. 
*/

import React from "react";
import { Dropdown } from "./Dropdown";

export class FilterWatchBar extends React.Component {
  constructor(props) {
    super(props);
    this.filterHome = this.filterHome.bind(this);
    this.clearGenreFilter = this.clearGenreFilter.bind(this);
  }

  clearGenreFilter(doClear) {
    if (doClear) {
      this.props.setMovGenresSelected("");
      this.props.setTVGenresSelected("");
      this.props.getWatchData();
    }
  }

  filterHome(mediaGenres, mode, watchCategory) {
    var tvGenres, movieGenres;
    if (mode === "TV Shows") {
      tvGenres = mediaGenres;
      movieGenres = "";
    } else {
      movieGenres = mediaGenres;
      tvGenres = "";
    }
    console.log(
      "you submitted the filters of: ",
      tvGenres,
      movieGenres,
      watchCategory
    );
    if (String(tvGenres).length > 0 || String(movieGenres).length > 0) {
      this.props.getWatchFilteredData(movieGenres, tvGenres, watchCategory);
    }
  }

  render() {
    return (
      <div className="filter-form">
        <div className="home-filter-row">
          {this.props.watchMode === "Movies" && (
            <Dropdown
              options={this.props.movieGenreOptions}
              placeholder="Filter Genres..."
              setData={this.filterHome}
              class="movie-genres-filter"
              isMulti={true}
              onClear={this.clearGenreFilter}
              mode={this.props.watchMode}
              watchCategory={this.props.watchCategory}
            />
          )}
          {this.props.watchMode === "TV Shows" && (
            <Dropdown
              options={this.props.tvGenreOptions}
              placeholder="Filter Genres..."
              setData={this.filterHome}
              class="tv-genres-filter"
              isMulti={true}
              onClear={this.clearGenreFilter}
              mode={this.props.watchMode}
              watchCategory={this.props.watchCategory}
            />
          )}
        </div>
      </div>
    );
  }
}
