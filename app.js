const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
iller = require("./routes/iller");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('http-responses'));

// Routes which should handle requests
app.use("/iller", iller);

app.use((req, res, next) => {
    next(new res.BadRequest());
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    var resultJson = {};
    resultJson.message = "smt wrong happened!";
    resultJson.type = "FAIL";
    res.json(resultJson);
});

module.exports = app;