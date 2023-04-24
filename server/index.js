const express = require('express');
const app = express();
//const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require('cors');
require('dotenv').config()

const bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => 'Server is running on port 5000');