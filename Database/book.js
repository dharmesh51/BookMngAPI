const mongoose = require("mongoose");

//Creating a book schema

const BookSchema = mongoose.Schema({
    ISBN:String,
    Title:String,
    Authors:[Number],
    Language:String,
    PubDate:String,
    NumOfPages:Number,
    Category:[String],
    Publications:Number,
});

//Creating a book model

const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;