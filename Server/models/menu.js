const mongoose = require ("mongoose");

const MenuSchema = mongoose.Schema({
    title:{
        type:String,
        unique: true,
    },
    miniature:String,
    path:{
        type:String,
        unique: true,
    },
    order:{
        type:Number,
        unique: true,
    },
    active:Boolean,
});

module.exports= mongoose.model("Menu", MenuSchema);
