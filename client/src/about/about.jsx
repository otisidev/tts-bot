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
						href="https://github.com/otisidev/tts-bot"
						className="ui icon right labeled button"
						role="button"
					>
						Github Repo
						<i aria-hidden="true" className="github icon" />
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
						<p>
							Developed by Anyacho Chiamaka using IBM Watson Text to speech
							services
						</p>
						<p>
							<b>Language</b>: JavaScript
						</p>
						<p>
							<b>Service</b>: IBM Watson Text2Speech API
						</p>
						<p>
							<b>Backend</b>: NodeJs
						</p>
						<p>
							<b>Repository</b>: Github
						</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							onClick={this.closeAbout}
							icon
							labelPosition="left"
							negative
							color="gray"
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
