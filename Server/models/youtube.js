const mongoose = require ("mongoose");
const mongoosePaginate = require ("mongoose-paginate");

const YoutubeSchema = mongoose.Schema({
    title:String,
    miniature:String,
    description:String,
    url:String,
});

YoutubeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model ("Youtube", YoutubeSchema);
