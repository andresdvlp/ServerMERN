const Youtube = require("../models/youtube");
const image = require("../utils/image");

function createVideo(req, res) {
    const youtube = new Youtube(req.body);

    const imagePath = image.getFilePath(req.files.miniature);
    youtube.miniature = imagePath;

    youtube.save((error, youtubeStored) => {
        if (error) {
            res.status(400).send({ msg: "Failed to save video" });
        } else {
            res.status(200).send(youtubeStored);
        }
    });
}


function getVideos(req, res) {
    const { page= 1,limit= 10,} = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Youtube.paginate({}, options, (error, videos) => {
        if (error) {
            res.status(400).send({ msg: "Failed to get videos" });
        } else {
            res.status(200).send(videos);
        }
    });
}

function updateVideo(req,res){
    const {id}=req.params;
    const videoData = req.body;

    if(req.files.miniature){
        const imagePath=image.getFilePath(req.files.miniature);
        videoData.miniature = imagePath;
    }

    Youtube.findByIdAndUpdate({_id:id},videoData,(error)=>{
        if(error){
            res.status(400).send({msg:"Failed to update videos"});
        }else{
            res.status(200).send({msg:"Video updated successfully"});
        }
    });
}

function deleteVideo(req,res){
    const {id} = req.params;
    Youtube.findByIdAndDelete(id,(error)=>{
        if(error){
            res.status(400).send({msg:"Failed to delete video"});
        }else{
            res.status(200).send({msg:"Video deleted successfully"});
        }
    })
}




module.exports = {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideo
};