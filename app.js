const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');
const tagsRoute = require('./routes/tags');
const homeRoute = require("./routes/home");
const articlesRoute = require("./routes/articles");

const errorHandler = require('./middlewares/errorHandler');

const app = new express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , "public")))


app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/tag", tagsRoute);
app.use("/article", articlesRoute);

app.use(errorHandler);

module.exports = app