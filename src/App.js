import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Output } from "./components/Output";
import { Select } from "./components/controls/Select";
import Text from "./components/controls/Text";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: "",
      text: ""
    };
  }

  componentDidMount() {
    console.log(
      "http://hipsterjesus.com/api?paras=" +
        this.state.paras +
        "&html=" +
        this.state.html
    );
    this.getSampleText();
  }

  getSampleText() {
    

    axios
      .get(
        "http://hipsterjesus.com/api?paras=" +
          this.state.paras +
          "&html=" +
          this.state.html
      )
      .then(res => {
        this.setState({ text: res.data.text }, () => {
          console.log(this.state);
        });
        console.log("Done !!!");
      })
      .catch(err => {
        console.log(err);
      });
  }
  showHtml(x) {
    this.setState({ html: x }, this.getSampleText);
  }
  changeParas(num) {
    this.setState({ paras: num }, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1>ReactJs Text-Generator</h1>
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="Include Html" />
            <Select
              value={this.state.html}
              onChange={this.showHtml.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Paragraphs :" />
            <Text
              value={this.state.paras}
              onChange={this.changeParas.bind(this)}
            />
          </div>
        </form>

        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
