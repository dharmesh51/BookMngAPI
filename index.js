require("dotenv").config();
//Frame work
const express = require('express');
const mongoose = require('mongoose');


//Import DataBase
const database = require('./Database/indexData');

//Models
const Bookmodel = require("./Database/book");
const Authormodel = require("./Database/author");
const Pubmodel = require("./Database/publication");


//Initializing express
const BookStore = express();

//Configuration
BookStore.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}
).then(() => console.log("connection successful!!!"));

// ---------------------------------------------------------------------------------------
// -------------------------------GET Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book
Description  --> get all books 
Access       --> Public
Prameters    --> None
Method       --> Get
*/
BookStore.get('/book' , async (req,res) => {
    const getallbooks = await Bookmodel.find();   //if U required author and pub then use it different model
    return res.json(getallbooks);
});

/*
Route        --> /id/                 to be more precise
Description  --> get specific book based on ISBN
Access       --> Public
Prameters    --> isbn
Method       --> Get
*/
BookStore.get('/id/:isbn' , async (req,res)  => {

    const getSpecificBook = await Bookmodel.findOne({ISBN: req.params.isbn});

    //const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);
    //if no data match mongoose gives null -->false
    if (!getSpecificBook) {
        res.json({error:`No Book found for the ISBN of ${req.params.isbn}`});
    }
    res.json(getSpecificBook);
});

/*
Route        --> /c/            here c stands for category
Description  --> get books for specific category
Access       --> Public
Prameters    --> category
Method       --> Get
*/
BookStore.get('/c/:category' , async (req, res) => {
    const getBooks = await Bookmodel.find({Category: req.params.category});
    //const getBooks = database.books.filter((book) => book.Category.includes(req.params.category));
    if (getBooks.length === 0) {
        res.json({error:`No Book found for Category of ${req.params.category}`});
    }
    return res.json(getBooks);
});

/*
Route        --> /a/            here a stands for authors
Description  --> Get a list of book based on a authorid
Access       --> Public
Prameters    --> authorid
Method       --> Get
*/
BookStore.get('/a/:authorid' , async (req, res) => {

    const getBooks = await Bookmodel.find({Authors: req.params.authorid});
    
    // const IntAuthorID = parseInt(req.params.authorid);
    // const getBooks = database.books.filter((book) => book.Authors.includes(IntAuthorID));
    if (getBooks.length === 0) {
        return res.json({error:`No Book found for Author of id ${req.params.authorid}`});
    }
    return res.json({Book:getBooks});
});


/*
Route        --> /author        
Description  --> get all authors
Access       --> Public
Prameters    --> None
Method       --> Get
*/
BookStore.get('/author' , async (req , res)  => {
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
BookStore.get('/author/id/:authorid' , async (req , res)  => {
    const getSpecificAuthor = await Authormodel.findOne({id: req.params.authorid});
    // const getSpecificAuthor = database.authors.filter((author) => author.id == req.params.authorid); 
    if (!getSpecificAuthor) {
        return res.json({error:`No author found for id ${req.params.authorid}`})
    }   

    return res.json({Author:getSpecificAuthor}); 
 });


 /*
Route        --> /author        t    
Description  --> get list of authors based on a bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
BookStore.get('/author/:bookID' , async (req , res)  => {
    const getSpecificAuthor = await Authormodel.find({bookid:req.params.bookID});
    // const getSpecificAuthor = database.authors.filter((author) => author.bookid.includes(req.params.bookID)); 
    if (getSpecificAuthor.length === 0) {
        return res.json({error:`No author found for  Book name ${req.params.bookID}`})
    }   

    return res.json({Author:getSpecificAuthor}); 
 });


  /*
Route        --> /publications        t    
Description  --> get all publications
Access       --> Public
Prameters    --> none
Method       --> Get
*/
BookStore.get('/publications' , async (req , res)  => {
    const getallpublications = await Pubmodel.find();
    return res.json({Publication:getallpublications}); 
 });

 /*
Route        --> /publications/id                     to be more precise  
Description  --> get specific publication by pubid
Access       --> Public
Prameters    --> pubid
Method       --> Get
*/
BookStore.get('/publications/id/:pubid' , async (req , res)  => {
    const getSpecificPublication = await Pubmodel.findOne({id:req.params.pubid}); 
    // const getSpecificPublication= database.publications.filter((publication) => publication.id == req.params.pubid); 
    if (!getSpecificPublication) {
        return res.json({error:`No publication found for id ${req.params.pubid}`});
    }   

    return res.json({Publication:getSpecificPublication}); 
 });

  /*
Route        --> /publications   
Description  --> get list of publication based on bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
BookStore.get('/publications/:bookID' , async (req , res)  => {
    const getSpecificPublication = await Pubmodel.find({bookid:req.params.bookID}); 
    // const getSpecificPublication= database.publications.filter((publication) => publication.bookid.includes(req.params.bookID)); 
    if (getSpecificPublication.length === 0) {
        return res.json({error:`No publication found for Book name ${req.params.bookID}`});
    }   

    return res.json({Publications:getSpecificPublication}); 
 });

// ---------------------------------------------------------------------------------------
// -------------------------------POST Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book/new  
Description  --> add new book
Access       --> Public
Prameters    --> none
Method       --> POST
*/
BookStore.post('/book/new' , async (req,res) => {
    const { newBook } = req.body;
    Bookmodel.create(newBook);
   // database.books.push(newBook);
     return res.json({Message:"Book added successfuly."});

});

/*
Route        --> /author/new  
Description  --> add new author
Access       --> Public
Prameters    --> none
Method       --> POST
*/
BookStore.post('/author/new' , (req,res) => {
    const { newAuthor } = req.body;

    Authormodel.create(newAuthor);
    //database.authors.push(newAuthor);
    return res.json({Message:"Author added successfuly."});

});


/*
Route        --> /publication/new  
Description  --> add new publication
Access       --> Public
Prameters    --> none
Method       --> POST
*/
BookStore.post('/publication/new' , (req,res) => {
    const { newPublication } = req.body;

    Pubmodel.create(newPublication);
    //database.publications.push(newPublication);
     return res.json({Message:"Publication  added successfuly."});

});


// ---------------------------------------------------------------------------------------
// -------------------------------PUT Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book/update 
Description  --> Update book title
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

BookStore.put('/book/update/:isbn' , async(req,res) => {
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

BookStore.put('/book/author/update/:isbn' , async(req,res) => {
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

/*
Route        --> /author/update 
Description  --> Update author name using id
Access       --> Public
Prameters    --> authorID
Method       --> PUT
*/

BookStore.put('/author/update/:authorID' , async (req,res) => {
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

/*
Route        --> /publication/update 
Description  --> Update publication name using id
Access       --> Public
Prameters    --> pubID
Method       --> PUT
*/

BookStore.put('/publication/update/:pubID' , async (req,res) => {
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
Route        --> /book/publication/update 
Description  --> update/add new book to a publication
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

BookStore.put('/book/publication/update/:isbn' , async (req,res) => {
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


// ---------------------------------------------------------------------------------------
// -------------------------------DELETE Method---------------------------------------------
// ---------------------------------------------------------------------------------------

/*
Route        --> /book/delete 
Description  --> delete a book
Access       --> Public
Prameters    --> isbn
Method       --> DELETE
*/

BookStore.delete('/book/delete/:isbn' , async(req,res) => {
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

BookStore.delete('/book/delete/author/:isbn/:authorID' , async (req,res) => {
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

/*
Route        --> /author/delete 
Description  --> delete a author
Access       --> Public
Prameters    --> authorID
Method       --> DELETE
*/

BookStore.delete('/author/delete/:authorID' , async(req,res) => {

    const deleteAuthor = await Authormodel.findOneAndDelete({id:req.params.authorID});

    // const updateauthordatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorID));
    // database.authors = updateauthordatabase ; 
    return res.json({Authors:deleteAuthor});
});

/*
Route        --> /publication/delete 
Description  --> delete a publication
Access       --> Public
Prameters    --> pubID
Method       --> DELETE
*/

BookStore.delete('/publication/delete/:pubID' , async(req,res) => {
    const deletePub = await Pubmodel.findOneAndDelete({id:req.params.pubID});
    // const updatepubdatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubID));
    // database.publications = updatepubdatabase ; 
    return res.json({Publication:deletePub});
});

/*
Route        --> /publication/delete/book
Description  --> delete a book from publication
Access       --> Public
Prameters    --> pubID
Method       --> DELETE
*/

BookStore.delete('/publication/delete/book/:isbn/:pubID' , async(req,res) => {
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
BookStore.listen(5000, () => console.log("Server is Running"));

