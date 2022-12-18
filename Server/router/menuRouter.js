const express = require("express");
const MenuController = require("../controllers/menuController");
const md_auth = require("../middleware/authMiddleWare");

const api = express.Router();

//Endpoints

api.post("/menu", [md_auth.asureAuth], MenuController.createMenu);

api.get("/menu", MenuController.getMenus);

api.patch("/menu/:id", [md_auth.asureAuth], MenuController.updateMenu);

api.delete("/menu/:id", [md_auth.asureAuth], MenuController.deleteMenu);


module.exports = api;


