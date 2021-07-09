//Initialize the router 
const Router = require('express').Router();

//Import the model
const Authormodel = require("../../Database/author");

// -------------------------------GET Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /author        
Description  --> get all authors
Access       --> Public
Prameters    --> None
Method       --> Get
*/
Router.get('/' , async (req , res)  => {
    const getallauthors = await Authormodel.find();
    return res.json(getallauthors); 
});

/*
Route        --> /author/id/        to be more precise 
Description  --> get specific athour by authorid
Access       --> Public
Prameters    --> authorid   [Check Database's and its authors object]
Method       --> Get
*/
Router.get('/id/:authorid' , async (req , res)  => {
    const getSpecificAuthor = await Authormodel.findOne({id: req.params.authorid});
    // const getSpecificAuthor = database.authors.filter((author) => author.id == req.params.authorid); 
    if (!getSpecificAuthor) {
        return res.json({error:`No author found for id ${req.params.authorid}`})
    }   

    return res.json({Author:getSpecificAuthor}); 
 });


 /*
Route        --> /author            
Description  --> get list of authors based on a bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
Router.get('/:bookID' , async (req , res)  => {
    const getSpecificAuthor = await Authormodel.find({bookid:req.params.bookID});
    // const getSpecificAuthor = database.authors.filter((author) => author.bookid.includes(req.params.bookID)); 
    if (getSpecificAuthor.length === 0) {
        return res.json({error:`No author found for  Book name ${req.params.bookID}`})
    }   

    return res.json({Author:getSpecificAuthor}); 
 });


 // -------------------------------POST Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /author/new  
Description  --> add new author
Access       --> Public
Prameters    --> none
Method       --> POST
*/
Router.post('/new' , (req,res) => {
    const { newAuthor } = req.body;

    Authormodel.create(newAuthor);
    //database.authors.push(newAuthor);
    return res.json({Message:"Author added successfuly."});

});


// -------------------------------PUT Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /author/update 
Description  --> Update author name using id
Access       --> Public
Prameters    --> authorID
Method       --> PUT
*/

Router.put('/update/:authorID' , async (req,res) => {
    const updatedAuthor = await Authormodel.findOneAndUpdate(
        {id:req.params.authorID},
        {name:req.body.authorName},
        {new:true},
        );
        return res.json({Author:updatedAuthor});
    // database.authors.forEach((author) => {
    //     if (author.id == req.params.authorID) {
    //         author.name = req.body.authorName;
    //         return; 
    //     }
    // });
});


// -------------------------------DELETE Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /author/delete 
Description  --> delete a author
Access       --> Public
Prameters    --> authorID
Method       --> DELETE
*/

Router.delete('/delete/:authorID' , async(req,res) => {

    const deleteAuthor = await Authormodel.findOneAndDelete({id:req.params.authorID});

    // const updateauthordatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorID));
    // database.authors = updateauthordatabase ; 
    return res.json({Authors:deleteAuthor});
});

module.exports = Router;