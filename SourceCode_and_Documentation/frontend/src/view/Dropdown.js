import React from "react";
import Select from "react-select";

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { selectedOption: this.props.default };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      if (selectedOption && selectedOption.length > 0) {
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
            console.log(selectedOption);
            this.props.setData(selectedOption[0]["value"]);
          }
        }
      } else {
        this.props.setData(selectedOption["value"]);
        if (this.props.setSelection) {
          this.props.setSelection(selectedOption["label"]);
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
