const mongoose = require("mongoose");

//Creating a author schema

const AuthorSchema = mongoose.Schema({
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


// Creating a author model
const AuthorModel = mongoose.model("Authors", AuthorSchema);

module.exports = AuthorModel;

