import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = { seenIndexes: [], values: {}, index: "" };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndices();
  }
  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }
  async fetchIndices() {
    const indices = await axios.get("/api/values/all");
    this.setState({ seenIndexes: indices.data });
  }
  renderIndicies() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  renderCalculated() {
    const entris = [];
    for (let key in this.state.values) {
      entris.push(
        <div key={key}>
          For index {key} i Calculated {this.state.values[key]}
        </div>
      );
    }
    return entris;
  }

  handleSubmit = async event => {
    event.preventDefault();
    axios.post("/api/values", { index: this.state.index });
    this.setState({ index: "" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indicies seen</h3>
        {this.renderIndicies()}
        <h3>Calculated values</h3>
      </div>
    );
  }
}

export default Fib;
