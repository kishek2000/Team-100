import React, { Component } from "react";
import { App } from "./App";

// const client = new Client();

// client.get();
// client.search(query);

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/home/")
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

export default AppContainer;
