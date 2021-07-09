//Initialize the router 
const Router = require('express').Router();

//Import the model
const Bookmodel = require("../../Database/book");

// -------------------------------GET Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book
Description  --> get all books 
Access       --> Public
Prameters    --> None
Method       --> Get
*/
Router.get('/' , async (req,res) => {
    const getallbooks = await Bookmodel.find();  
    return res.json(getallbooks);
});


/*
Route        --> /book/id                to be more precise
Description  --> get specific book based on ISBN
Access       --> Public
Prameters    --> isbn
Method       --> Get
*/
Router.get('/id/:isbn' , async (req,res)  => {

    const getSpecificBook = await Bookmodel.findOne({ISBN: req.params.isbn});

    //const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    //if no data match mongoose gives null -->false
    if (!getSpecificBook) {
        res.json({error:`No Book found for the ISBN of ${req.params.isbn}`});
    }
    res.json(getSpecificBook);
});

/*
Route        --> /book/c           here c stands for category
Description  --> get books for specific category
Access       --> Public
Prameters    --> category
Method       --> Get
*/
Router.get('/c/:category' , async (req, res) => {
    const getBooks = await Bookmodel.find({Category: req.params.category});
    //const getBooks = database.books.filter((book) => book.Category.includes(req.params.category));
    if (getBooks.length === 0) {
        return res.json({error:`No Book found for Category of ${req.params.category}`});
    }
    return res.json(getBooks);
});

/*
Route        --> /book/a            here a stands for authors
Description  --> Get a list of book based on a authorid
Access       --> Public
Prameters    --> authorid
Method       --> Get
*/
Router.get('/a/:authorid' , async (req, res) => {
    const getBooks = await Bookmodel.find({Authors: req.params.authorid});
    
    // const IntAuthorID = parseInt(req.params.authorid);
    // const getBooks = database.books.filter((book) => book.Authors.includes(IntAuthorID));
    if (getBooks.length === 0) {
        return res.json({error:`No Book found for Author of id ${req.params.authorid}`});
    }
    return res.json({Book:getBooks});
});



// -------------------------------POST Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book/new  
Description  --> add new book
Access       --> Public
Prameters    --> none
Method       --> POST
*/
Router.post('/new' , async (req,res) => {
    const { newBook } = req.body;
    Bookmodel.create(newBook);
   // database.books.push(newBook);
     return res.json({Message:"Book added successfuly."});

});


// -------------------------------PUT Method---------------------------------------------
// ---------------------------------------------------------------------------------------


/*
Route        --> /book/update 
Description  --> Update book title
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

Router.put('/update/:isbn' , async(req,res) => {
    const updatebook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {Title:req.body.bookTitle},
        {new:true}
        );
    return res.json({Books:updatebook});

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.Title = req.body.bookTitle ;
    //         return; 
    //     }
    // });
});

/*
Route        --> /book/author/update 
Description  --> Update/add new author
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

Router.put('/author/update/:isbn' , async(req,res) => {
    //Update the book database
    const updatedbook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {
            $addToSet:{
                Authors:req.body.newAuthor,
            },
        },
        {new:true}
        );
    // database.books.forEach((book) =>{
    //     if (book.ISBN === req.params.isbn) {
    //         book.Authors.push(req.body.newAuthor);
    //         return;
    //     }
    // });

    //Update author database
    const updatedAuthor = await Authormodel.findOneAndUpdate(
        {id:req.body.newAuthor},
        {
            $addToSet:{
                bookid:req.params.isbn,
            },
        },
        {new:true}
        );
    // database.authors.forEach((author) =>{
    //     if (author.id === req.body.newAuthor) {
    //        author.bookid.push(req.params.isbn); 
    //        return;
    //     }

    // });

    return res.json({
        Books:updatedbook,
        Authors:updatedAuthor,
        Message:"Author update successfuly."
    });
});


// -------------------------------DELETE Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book/delete 
Description  --> delete a book
Access       --> Public
Prameters    --> isbn
Method       --> DELETE
*/

Router.delete('/delete/:isbn' , async(req,res) => {
    const deletebook = await Bookmodel.findOneAndDelete({ISBN:req.params.isbn});

    // const updatedbookdatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    // database.books = updatedbookdatabase;
    return res.json({Books:deletebook});
});

/*
Route        --> /book/delete/author 
Description  --> delete a author from a book
Access       --> Public
Prameters    --> isbn,authorID
Method       --> DELETE
*/

Router.delete('/delete/author/:isbn/:authorID' , async (req,res) => {
    //update book database
    const updatedBook = await Bookmodel.findOneAndUpdate(
        {ISBN:req.params.isbn},
        {
            $pull:{
                Authors:parseInt(req.params.authorID),
            }
        },
        {new:true}
        );
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAthors = book.Authors.filter((author) => author !== parseInt(req.params.authorID));
    //         book.Authors = newAthors ;
    //         return;
    //     }
    // });

    //update author database after delete Author from books database
    const updatedAuthor = await Authormodel.findOneAndUpdate(
        {id:parseInt(req.params.authorID)},
        {
            $pull:{
                bookid:req.params.isbn,
            }
        },
        {new:true}
        );
    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorID)) {
    //         const newBookid = author.bookid.filter((bookID) => bookID !== req.params.isbn);
    //         author.bookid = newBookid;
    //         return;
    //     }
    // });

    return res.json({Massage:"deleted Sucessfuly",Books:updatedBook,Authors:updatedAuthor});
});

module.exports = Router;