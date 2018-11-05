import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./home.css";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileSaver from "file-saver";
import { Dropdown, Form, Button, Icon } from "semantic-ui-react";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			voices: [],
			loading: false,
			converting: false,
			selectedVoice: "",
			inputModel: "",
			audio: "",
			option: {
				position: "top-right",
				autoClose: true,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false
			}
		};
	}

	componentDidMount() {
		this.setLoading(true);
		this.getVoices()
			.then(cb => {
				this.setState({ voices: cb });
				this.setLoading(false);
			})
			.catch(err => {
				this.setLoading(false);
				// toast.error(err.statusText);
			});
	}
	// loading
	setLoading = state => this.setState({ loading: state });
	// function to get voice from server
	getVoices = async () => {
		const response = await fetch("/api/service/voices");
		const body = await response.json();
		console.log(JSON.stringify(body, null, 6));
		// only for error
		// toast.error(response.statusText, this.state.option);
		// return res body here.
		return body;
	};

	// reset application
	resetApp = () => {
		this.setState({ selectedVoice: "" });
		this.setState({ inputModel: "" });
		this.setState({ audio: "" });
	};

	// handle listen button clicked event
	handleListen = () => {
		if (this.isFormValid()) {
			this.setConverting(true);
			this.convertText()
				.then(cb => {
					this.setConverting(false);
					const music = document.getElementById("output");
					music.src = URL.createObjectURL(cb);
					music.load();
					music.play();
				})
				.catch(() => {
					this.setConverting(false);
					// toast.error("Failed! Please try again later", this.state.option);
				});
		} else {
			alert("Form is invalid!");
		}
	};
	// post to server
	convertText = async () => {
		const response = await fetch("/api/service/convert", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				input: this.state.inputModel,
				voice: this.state.selectedVoice
			})
		});

		const body = await response.blob();
		// if (response.status !== 200) {
		// 	// toast.error(body.message, this.state.option);
		// 	// throw Error(body.message);
		// }

		return body;
	};
	// handly user input
	handleUserInput = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	// onItemselected
	handleItemSelection = (event, data) => {
		const { name, value } = data;
		this.setState({ [name]: value });
	};
	// validation
	isFormValid = () => {
		return this.state.inputModel !== null || this.state.selectedVoice !== null;
	};
	// toggle loading state
	setConverting = state => this.setState({ converting: state });

	// submit form : Download button clicked
	handleFormSubmittion = () => {
		if (this.isFormValid()) {
			this.setConverting(true);
			this.convertText()
				.then(cb => {
					this.setConverting(false);
					FileSaver.saveAs(cb, "audio.mp3");
				})
				.catch(rr => {
					this.setConverting(false);
					console.log(rr);
				});
		}
	};
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
					<Form error className="m-t" onSubmit={this.handleFormSubmittion}>
						<Form.Field>
							<label>Voice Language</label>
							<Dropdown
								loading={this.state.loading}
								className="ui purple fluid"
								placeholder="Select Voice-language"
								search
								name="selectedVoice"
								selection
								value={this.state.selectedVoice}
								onChange={this.handleItemSelection}
								options={this.state.voices}
							/>
						</Form.Field>
						<Form.TextArea
							rows="10"
							name="inputModel"
							value={this.state.inputModel}
							label="Input Text"
							onChange={event => this.handleUserInput(event)}
							placeholder="enter the text to be converted .."
						/>
						<Button
							loading={this.state.converting}
							disabled={this.state.loading || !this.isFormValid}
							icon
							labelPosition="right"
							color="purple"
							type="submit"
						>
							Download
							<Icon name="cloud download" />
						</Button>
						<Button
							icon
							loading={this.state.converting}
							onClick={this.handleListen}
							disabled={
								this.state.loading || this.state.converting || !this.isFormValid
							}
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
							disabled={this.state.loading || this.state.converting}
							basic
							color="purple"
							floated="right"
							onClick={this.resetApp}
						>
							Reset
							<Icon name="undo" />
						</Button>
					</Form>
					<audio id="output" />
				</div>
				<Footer />
				{/* <ToastContainer
					position="bottom-right"
					autoClose={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable={false}
				/> */}
			</React.Fragment>
		);
	}
}

export default Home;
