import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="ui very padded segment">
        <div className="ui center aligned container">
          <p>
            Developed by Anyacho Chiamaka using IBM Watson Text to speech
            services | Git repo
            <a
              className="ui purple"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/otisidev/tts-bot"
            >
              &nbsp; here
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
