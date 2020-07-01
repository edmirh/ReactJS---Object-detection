const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
	   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port);
console.log(`Running on http://192.168.0.109:${port}`);
