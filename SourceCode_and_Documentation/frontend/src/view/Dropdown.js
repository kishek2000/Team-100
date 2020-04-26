import React from "react";
import Select from "react-select";

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.default,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    if (this.state.selectedOption && this.props.getData) {
      this.props.getData(this.state.selectedOption["value"]);
    }
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      console.log("selected option is: ", selectedOption);
      if (selectedOption !== null && selectedOption.length > 0) {
        if (selectedOption.length > 1) {
          if (this.props.mode !== undefined) {
            this.props.setData(
              selectedOption
                .map(function (stream) {
                  return stream["value"];
                })
                .join("&"),
              this.props.mode,
              this.props.watchCategory
            );
          } else {
            this.props.setData(
              selectedOption
                .map(function (stream) {
                  return stream["value"];
                })
                .join("&")
            );
          }
        } else {
          if (this.props.isMulti && this.props.mode !== undefined) {
            this.props.setData(
              selectedOption[0]["value"],
              this.props.mode,
              this.props.watchCategory
            );
          } else if (this.props.isMulti) {
            this.props.setData(selectedOption[0]["value"]);
          }
        }
      } else {
        if (selectedOption === null) {
          this.props.setData(selectedOption);
        } else if (typeof selectedOption !== "string") {
          if (this.props.onClear) {
            this.props.onClear(true);
          } else if (this.props.setData) {
            this.props.setData(selectedOption["value"]);
          }
          if (this.props.setSelection && this.props.getData) {
            this.props.getData(selectedOption["value"]);
            this.props.setSelection(selectedOption);
          }
        } else {
          this.props.setData(selectedOption);
        }
      }
    });
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.options}
        className={this.props.class}
        placeholder={this.props.placeholder}
        isMulti={this.props.isMulti}
        isSearchable={false}
        const
        styles={this.props.styles}
      />
    );
  }
}
