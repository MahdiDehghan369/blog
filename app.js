const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/auth');
const tagsRoute = require('./routes/tags');
const homeRoute = require("./routes/home");
const articlesRoute = require("./routes/articles");
const userRoute = require("./routes/user");
const apiDocRoute = require("./apiDoc/swagger.routes");

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
app.use("/user", userRoute);
app.use("/api-doc", apiDocRoute);

app.use(errorHandler);

module.exports = app