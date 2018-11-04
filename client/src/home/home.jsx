import React, { Component } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
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
				console.error(JSON.stringify(err));
			});
	}
	// loading
	setLoading = state => this.setState({ loading: state });
	// function to get voice from server
	getVoices = async () => {
		const response = await fetch("/api/service/voices");
		const body = await response.json();
		// only for error
		if (response.status !== 200) throw Error(body.message);
		// return res body here.
		return body;
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
		if (response.status !== 200) {
			toast.error(body.message, this.state.option);
			throw Error(body.message);
		}

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
	// vlidation
	isFormValid = () => {
		return this.state.inputModel !== null || this.state.selectedVoice !== null;
	};
	// set converting
	setConverting = state => this.setState({ converting: state });
	// submit form
	handleFormSubmittion = () => {
		if (this.isFormValid()) {
			this.setConverting(true);
			this.convertText()
				.then(cb => {
					this.setConverting(false);
					FileSaver.saveAs(cb, "audio.mp3");
					// const music = document.getElementById("output");
					// console.log(music);
					// music.src = URL.createObjectURL(cb);
					// music.load();
					// console.log("volume ", music.volume);
					// music.play();
				})
				.catch(() => {
					this.setConverting(false);
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
								onChange={this.handleItemSelection}
								options={this.state.voices}
							/>
						</Form.Field>
						<Form.TextArea
							rows="10"
							name="inputModel"
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
						>
							Reset
							<Icon name="undo" />
						</Button>
					</Form>
					<audio id="output" />
				</div>
				<Footer />
				<ToastContainer
					position="bottom-right"
					autoClose={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable={false}
				/>
			</React.Fragment>
		);
	}
}

export default Home;
