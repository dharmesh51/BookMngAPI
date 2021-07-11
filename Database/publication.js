const mongoose = require("mongoose");

//Creating a publication schema

const PubSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    bookid:[String],
});

//Creating a publication model

const PubModel = mongoose.model("Publications", PubSchema);

module.exports = PubModel;