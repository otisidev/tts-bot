import React, { Component } from "react";
import About from "../about/about";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <About />
        <img className="ui  tiny image" alt="logo" src="favicon.png" />
        <h2 className="ui purple header">
          <div className="content">
            Text To Speech Bot
            <div className="sub header">
              The Text to Speech service understands text and natural language
              to generate synthesized audio output complete with appropriate
              cadence and intonation. It is available in 13 voices across 7
              languages. Select voices now offer Expressive Synthesis and Voice
              Transformation features.
            </div>
          </div>
        </h2>
      </React.Fragment>
    );
  }
}

export default Header;
