const multipart = require("connect-multiparty");
const express = require("express");
const UserController = require("../controllers/userController");
const md_auth = require("../middleware/authMiddleWare");


const md_upload = multipart({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
//console.log(api)

api.get("/users", [md_auth.asureAuth], UserController.getUsers);

api.post("/createUser", [md_auth.asureAuth, md_upload], UserController.createUser);
api.patch("/user/:id",[md_auth.asureAuth,md_upload], UserController.updateUser);

api.delete("/user/:id",[md_auth.asureAuth],UserController.deleteUser);

module.exports = api;