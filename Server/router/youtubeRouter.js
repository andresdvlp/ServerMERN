const express = require("express");
const YoutubeController = require("../controllers/youtubeController");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authMiddleWare");




const md_upload = multiparty({ uploadDir: "./uploads/youtube" });
const api = express.Router();

api.post("/youtube", [md_auth.asureAuth, md_upload], YoutubeController.createVideo);
api.get("/videos", YoutubeController.getVideos);
api.patch("/video/:id",[md_auth.asureAuth,md_upload], YoutubeController.updateVideo);
api.delete("/video/:id",[md_auth.asureAuth],YoutubeController.deleteVideo);






module.exports = api;