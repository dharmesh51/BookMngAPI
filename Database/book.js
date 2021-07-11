const mongoose = require("mongoose");

let notEmpty = function (value) {
    if (value.length === 0) {  return false; }
    else {  return true; }
  };

  
//Creating a book schema

const BookSchema = mongoose.Schema({
    ISBN:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 5  
    },
    Title:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 50,
        uppercase:true 
    },
    Authors:{
        type:[Number],
        required:true,
        validate:[notEmpty, 'Please add at least one Author in array']
    },
    Language:{
        type:String,
        lowercase:true,
        enum:["english","hindi","gujarati"]
        

    },
    PubDate:String,
    NumOfPages:Number,
    Category:[String],
    Publications:Number,
});

// function arrayLimit(val) {
//     return val.length >=1;
    
// }

//Creating a book model

const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;