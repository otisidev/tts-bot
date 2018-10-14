import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./home.css";
import { Dropdown, Form, Button, Icon } from "semantic-ui-react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voices: [
        { key: "enUs", value: "en-Us", text: "English (United States)" },
        { key: "frFR", value: "fr-FR", text: "French" }
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="ui raised very padded text container segment">
          <Header />
          <hr />
          <h3 className="ui purple header">Input Text</h3>
          <p className="margin">
            The text language must match the selected voice language: Mixing
            language (English text with a Spanish male voice) does not produce
            valid results. The synthesized audio is streamed to the client as it
            is being produced, using the HTTP chunked encoding. The audio is
            returned in mp3 format which can be played using VLC and Audacity
            players.
          </p>
          <Form className="m-t">
            <Form.Field>
              <label>Voice Language</label>
              <Dropdown
                className="ui purple fluid"
                placeholder="Select Voice-language"
                search
                selection
                options={this.state.voices}
              />
            </Form.Field>
            <Form.TextArea
              rows="10"
              label="Input Text"
              placeholder="enter the text to be converted .."
            />
            <Button icon labelPosition="right" color="purple" type="submit">
              Download
              <Icon name="cloud download" />
            </Button>
            <Button
              icon
              basic
              labelPosition="right"
              color="purple"
              type="button"
            >
              Listen
              <Icon name="assistive listening systems" />
            </Button>
            <Button
              icon
              labelPosition="right"
              basic
              color="purple"
              floated="right"
            >
              Reset
              <Icon name="undo" />
            </Button>
          </Form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
