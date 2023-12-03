const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const apiRouter = require("./routes/index.router");

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", apiRouter);

app.use((error, req, res, next) => {
    console.error(error);
    return res.status(500).json({error: "Internal server error"});
});


module.exports = app;
