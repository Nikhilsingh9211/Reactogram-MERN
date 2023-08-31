const express = require("express");
const PORT = 3000;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_DB_URL } = require("./config");

mongoose.connect(MONGO_DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to MongoDB");
});

require("./models/user_models");

app.use(cors());
app.use(express.json());

require("./models/user_models");
app.use(require("./routes/user_route"));

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
