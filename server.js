var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
const SERVER_PORT = 8000;
app.listen(SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});

