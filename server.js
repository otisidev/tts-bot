const express = require("express");
const TextToSpeechV1 = require("watson-developer-cloud/text-to-speech/v1");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8082;
const cors = require("cors");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Request-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST PATCH, DELETE");
	}
	// contuine executing ..
	next();
});

// use cors
app.use(
	cors({
		origin: "*",
		methods: "*",
		allowedHeaders: "*"
	})
);

//
const text2Speech = new TextToSpeechV1({
	username: "7f9ce501-830b-45d6-b4d8-349a22814c30",
	password: "VsAXiBDft8mH",
	url: "https://stream.watsonplatform.net/text-to-speech/api"
});

app.use(express.static(path.join(__dirname, "client/build")));
// done: Tested
app.get("/api/service/voices", (req, res) => {
	// TODO: call api here
	text2Speech.listVoices(null, (err, voices) => {
		if (err) {
			return res.status(500).send(err);
		}
		const vs = voices.voices.map(voice => {
			return {
				key: voice.name,
				value: voice.name,
				text: voice.description
			};
		});
		return res.status(200).send(vs);
	});
});
//convert
app.post("/api/service/convert", (req, res) => {
	// TODO: valid?
	const { voice, input } = req.body;
	if (voice && input) {
		//convert now
		const synthesizeParams = {
			text: input,
			accept: "audio/mpeg",
			voice: voice
		};
		text2Speech.synthesize(synthesizeParams, (err, file) => {
			if (err) {
				return res.status(500).json({ message: err.message, status: 500, err });
			}
			return res.send(file);
		});
	} else {
		return res.status(404).send({
			message: "Bad data! Voice and input text are required!",
			status: 404
		});
	}
	//TODO: call api here
});

//every other request
// app.get("*", (req, res) => {
// 	return res.sendfile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => {
	console.log("Server listening on port:" + PORT);
});
