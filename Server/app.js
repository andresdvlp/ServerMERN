const express = require("express");
const { API_VERSION } = require("./constants");
//const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Import routing
const authRoutes = require("./router/authRouter");
const userRoutes = require("./router/userRouter");
const menuRoutes = require("./router/menuRouter");
const youtubeRoutes = require ("./router/youtubeRouter");


//Configure Body Parse
//app.use(bodyParser.urlencoded({extender:true}));
app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.json());
app.use(express.json());

//Configure static folder
app.use(express.static("uploads"));




//Configure Header HTTP - CORS

app.use(cors());





//Confugure Routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, youtubeRoutes);

module.exports = app;