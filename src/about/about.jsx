import React, { Component } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

class About extends Component {
  state = { open: false };
  // open about
  showAbout = () => this.setState({ open: true });
  // close about
  closeAbout = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <Button.Group floated="right">
          <Button
            onClick={this.showAbout}
            icon
            color="purple"
            labelPosition="left"
          >
            About
            <Icon name="dot circle outline" />
          </Button>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/otisidev"
            className="ui icon right labeled button"
            role="button"
          >
            Github Repo
            <i aria-hidden="true" class="github icon" />
          </a>
        </Button.Group>
        <Modal
          dimmer="blurring"
          size="tiny"
          open={this.state.open}
          onClose={this.closeAbout}
        >
          <Modal.Header>About TTS Bot</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.closeAbout}
              icon
              labelPosition="left"
              negative
              basic
              color="red"
            >
              Close
              <Icon name="close" />
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default About;
