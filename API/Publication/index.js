//Initialize the router 
const Router = require('express').Router();

//Import the model
const Pubmodel = require("../../Database/publication");



// -------------------------------GET Method---------------------------------------------
// ---------------------------------------------------------------------------------------


  /*
Route        --> /publication           
Description  --> get all publications
Access       --> Public
Prameters    --> none
Method       --> Get
*/
Router.get('/' , async (req , res)  => {
    const getallpublications = await Pubmodel.find();
    return res.json({Publication:getallpublications}); 
 });

 /*
Route        --> /publication/id                     to be more precise  
Description  --> get specific publication by pubid
Access       --> Public
Prameters    --> pubid
Method       --> Get
*/
Router.get('/id/:pubid' , async (req , res)  => {
    const getSpecificPublication = await Pubmodel.findOne({id:req.params.pubid}); 
    // const getSpecificPublication= database.publications.filter((publication) => publication.id == req.params.pubid); 
    if (!getSpecificPublication) {
        return res.json({error:`No publication found for id ${req.params.pubid}`});
    }   

    return res.json({Publication:getSpecificPublication}); 
 });

  /*
Route        --> /publication   
Description  --> get list of publication based on bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
Router.get('/:bookID' , async (req , res)  => {
    const getSpecificPublication = await Pubmodel.find({bookid:req.params.bookID}); 
    // const getSpecificPublication= database.publications.filter((publication) => publication.bookid.includes(req.params.bookID)); 
    if (getSpecificPublication.length === 0) {
        return res.json({error:`No publication found for Book name ${req.params.bookID}`});
    }   

    return res.json({Publications:getSpecificPublication}); 
 });

 // -------------------------------POST Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /publication/new  
Description  --> add new publication
Access       --> Public
Prameters    --> none
Method       --> POST
*/
Router.post('/new' , (req,res) => {
    const { newPublication } = req.body;

    Pubmodel.create(newPublication);
    //database.publications.push(newPublication);
     return res.json({Message:"Publication  added successfuly."});

});


// -------------------------------PUT Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /publication/update 
Description  --> Update publication name using id
Access       --> Public
Prameters    --> pubID
Method       --> PUT
*/

Router.put('/update/:pubID' , async (req,res) => {
    const updatedPub = await Pubmodel.findOneAndUpdate(
        {id:req.params.pubID},
        {name:req.body.pubName},
        {new:true},
        );
        return res.json({Publications:updatedPub});
    // database.publications.forEach((publication) => {
    //     if (publication.id == req.params.pubID) {
    //         publication.name = req.body.pubName;
    //         return; 
    //     }
        
    // });
});

/*
Route        --> /publication/book/update 
Description  --> update/add new book to a publication
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

Router.put('/book/update/:isbn' , async (req,res) => {
    //Update Publication  database
    const updatedPub = await Pubmodel.findOneAndUpdate(
        {id:req.body.Pubid},
        {
            $addToSet:{
                bookid:req.params.isbn,
            },
        },
        {new:true}
        );
    // database.publications.forEach((publication) =>{
    //     if (publication.id === req.body.Pubid) {
    //        publication.bookid.push(req.params.isbn); 
    //        return;
    //     }
    // });

    //Update the book database
    const updatedbook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {Publications:req.body.Pubid},
        {new:true}
        );
    // database.books.forEach((book) =>{
    //     if (book.ISBN === req.params.isbn) {
    //         book.Publications = req.body.Pubid;
    //         return;
    //     }
    // });


   return res.json({
       Books:updatedbook,
       Publication:updatedPub,
       Message:"Publication update successfuly."
    });
});

// -------------------------------DELETE Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /publication/delete 
Description  --> delete a publication
Access       --> Public
Prameters    --> pubID
Method       --> DELETE
*/

Router.delete('/delete/:pubID' , async(req,res) => {
    const deletePub = await Pubmodel.findOneAndDelete({id:req.params.pubID});
    // const updatepubdatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubID));
    // database.publications = updatepubdatabase ; 
    return res.json({Publication:deletePub});
});

/*
Route        --> /publication/delete/book
Description  --> delete a book from publication
Access       --> Public
Prameters    --> isbn,pubID
Method       --> DELETE
*/

Router.delete('/delete/book/:isbn/:pubID' , async(req,res) => {
    //update publication database
    const updatedPub = await Pubmodel.findOneAndUpdate(
        {id:req.params.pubID},
        {
            $pull:{
                bookid:req.params.isbn,
            }
        },
        {new:true}
        );
    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.pubID)) {
    //         const newbooklist = publication.bookid.filter((bookID) => bookID !== req.params.isbn );
    //         publication.bookid = newbooklist;
    //         return;
    //     }
    // });

    //update book database
    const updatedBook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {
            $set:{
                 Publications :0,
                }
        },
        {new:true});
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.Publications = 0; //means no publication publish this book
    //     }
    //     return;

    // });
    return res.json({Publication:updatedPub,Books:updatedBook});
});


module.exports = Router;