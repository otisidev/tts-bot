import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class Alert extends Component {
  renderComponent = () => {
    if (this.props.message !== null) {
      return null;
    } else {
      return (
        <Message
          error
          header={this.props.header}
          content={this.props.message}
        />
      );
    }
  };

  render() {
    return this.renderComponent();
  }
}

export default Alert;
