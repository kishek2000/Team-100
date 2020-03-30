import React, { Component } from "react";
import { render } from "react-dom";
import { App } from "./App";

class BackEndContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/home/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    if (this.state.data.watch_data !== undefined) {
      console.log(
        `This is our data now: ${JSON
          .stringify
          // this.state.data.watch_data[0]["Now Airing TV Shows"][0]
          ()}`
      );
    }
    return (
      <div>
        <App
          watchExperienceData={this.state.data.watch_data}
          listenExperienceData={this.state.data.listen_data}
        />
      </div>
    );
  }
}

export default BackEndContainer;

const container = document.getElementById("app");
render(<BackEndContainer />, container);
