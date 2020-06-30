const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "edmir",
	database: "results"
});

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
	   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

con.connect();

app.set('/results/test.txt', function(req, res) {
	var detected = req.body;
	var query = con.query('INSERT INTO board(Name) VALUES(?)', 'STM32F407', function(err, result) {});
	res.end('Success');
});

app.listen(process.env.PORT || port);
console.log(`Running on http://192.168.0.109:${port}`);
