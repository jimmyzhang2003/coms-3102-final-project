const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/note_routes");

// configure .env files
dotenv.config();

// set up express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/notes", noteRoutes);

// connect to MongoDB
async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error(error);
	}
}
connect();

// have server listen on port 3001
const SERVER_PORT = process.env.port || 3001;

app.listen(SERVER_PORT, () => {
	console.log(`Listening on port ${SERVER_PORT}`);
});
