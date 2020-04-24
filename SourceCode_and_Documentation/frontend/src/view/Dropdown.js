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
      if (selectedOption !== null && selectedOption.length > 0) {
        if (selectedOption.length > 1) {
          this.props.setData(
            selectedOption
              .map(function (stream) {
                return stream["value"];
              })
              .join("&")
          );
        } else {
          if (this.props.isMulti) {
            this.props.setData(selectedOption[0]["value"]);
          }
        }
      } else {
        if (selectedOption === null) {
          this.props.setData(selectedOption);
        } else if (typeof selectedOption !== "string") {
          if (this.props.setData) {
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
        colourStyles={{
          placeholder: (defaultStyles) => {
            return {
              ...defaultStyles,
              color: "black",
            };
          },
        }}
      />
    );
  }
}
