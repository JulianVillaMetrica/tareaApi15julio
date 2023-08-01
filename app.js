const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// create our express app
const app = express();
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require("./routes/Routes");

//lo nuevo
const geoRoutes = require("./routes/geotab.routes");


const GeotabApi = require('mg-api-js');
const serverMetrica = process.env.SERVER;
const db = process.env.DATABASE;
const userName = process.env.USERNAME;
const sessionId = process.env.SESSIONID;

app.use("/", routes);
app.use("/", geoRoutes);

//start server
app.listen(3000, () => {
    console.log("listening at port:3000");
});
