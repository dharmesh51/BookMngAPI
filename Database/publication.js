const mongoose = require("mongoose");

//Creating a publication schema

const PubSchema = mongoose.Schema({
    id:Number,
    name:String,
    bookid:[String],
});

//Creating a publication model

const PubModel = mongoose.model("Publications", PubSchema);

module.exports = PubModel;