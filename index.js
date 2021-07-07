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
Route        --> /
Description  --> get books or authors or publications 
Access       --> Public
Prameters    --> None
Method       --> Get
*/
BookStore.get('/' , async (req,res) => {
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
    const getBooks = await Bookmodel.findOne({Category: req.params.category});
    //const getBooks = database.books.filter((book) => book.Category.includes(req.params.category));
    if (!getBooks) {
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
    if (!getBooks) {
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
BookStore.get('/author' , (req , res)  => {
   res.json({authors:database.authors}); 
});

/*
Route        --> /author/id/        to be more precise 
Description  --> get specific athour by authorid
Access       --> Public
Prameters    --> authorid   [Check Database's and its authors object]
Method       --> Get
*/
BookStore.get('/author/id/:authorid' , (req , res)  => {
    const getSpecificAuthor = database.authors.filter((author) => author.id == req.params.authorid); 
    if (getSpecificAuthor.length === 0) {
        res.json({error:`No author found for id ${req.params.authorid}`})
    }   

    res.json({Author:getSpecificAuthor}); 
 });


 /*
Route        --> /author        t    
Description  --> get list of authors based on a bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
BookStore.get('/author/:bookID' , (req , res)  => {
    const getSpecificAuthor = database.authors.filter((author) => author.bookid.includes(req.params.bookID)); 
    if (getSpecificAuthor.length === 0) {
        res.json({error:`No author found for  Book name ${req.params.bookID}`})
    }   

    res.json({Author:getSpecificAuthor}); 
 });


  /*
Route        --> /publications        t    
Description  --> get all publications
Access       --> Public
Prameters    --> none
Method       --> Get
*/
BookStore.get('/publications' , (req , res)  => {
    res.json({Publication:database.publications}); 
 });

 /*
Route        --> /publications/id                     to be more precise  
Description  --> get specific publication by pubid
Access       --> Public
Prameters    --> pubid
Method       --> Get
*/
BookStore.get('/publications/id/:pubid' , (req , res)  => {
    const getSpecificPublication= database.publications.filter((publication) => publication.id == req.params.pubid); 
    if (getSpecificPublication.length === 0) {
        res.json({error:`No publication found for id ${req.params.pubid}`})
    }   

    res.json({Publication:getSpecificPublication}); 
 });

  /*
Route        --> /publications   
Description  --> get list of publication based on bookid
Access       --> Public
Prameters    --> bookID
Method       --> Get
*/
BookStore.get('/publications/:bookID' , (req , res)  => {
    const getSpecificPublication= database.publications.filter((publication) => publication.bookid.includes(req.params.bookID)); 
    if (getSpecificPublication.length === 0) {
        res.json({error:`No publication found for Book name ${req.params.bookID}`})
    }   

    res.json({Publications:getSpecificPublication}); 
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

BookStore.put('/book/update/:isbn' , (req,res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.Title = req.body.bookTitle ;
            return; 
        }
        
    });
    res.json({Books:database.books});
});

/*
Route        --> /book/author/update 
Description  --> Update/add new author
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

BookStore.put('/book/author/update/:isbn' , (req,res) => {
    //Update the book database
    database.books.forEach((book) =>{
        if (book.ISBN === req.params.isbn) {
            book.Authors.push(req.body.newAuthor);
            return;
        }
    });

    //Update author database
    database.authors.forEach((author) =>{
        if (author.id === req.body.newAuthor) {
           author.bookid.push(req.params.isbn); 
           return;
        }

    });

    return res.json({
        Books:database.books,
        Authors:database.authors,
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

BookStore.put('/author/update/:authorID' , (req,res) => {
    database.authors.forEach((author) => {
        if (author.id == req.params.authorID) {
            author.name = req.body.authorName;
            return; 
        }
        
    });
    res.json({Author:database.authors});
});

/*
Route        --> /publication/update 
Description  --> Update publication name using id
Access       --> Public
Prameters    --> pubID
Method       --> PUT
*/

BookStore.put('/publication/update/:pubID' , (req,res) => {
    database.publications.forEach((publication) => {
        if (publication.id == req.params.pubID) {
            publication.name = req.body.pubName;
            return; 
        }
        
    });
    res.json({Publications:database.publications});
});

/*
Route        --> /book/publication/update 
Description  --> Update/add new author
Access       --> Public
Prameters    --> isbn
Method       --> PUT
*/

BookStore.put('/book/publication/update/:isbn' , (req,res) => {
    //Update Publication  database
    database.publications.forEach((publication) =>{
        if (publication.id === req.body.Pubid) {
           publication.bookid.push(req.params.isbn); 
           return;
        }

    });

    //Update the book database
    database.books.forEach((book) =>{
        if (book.ISBN === req.params.isbn) {
            book.Publications = req.body.Pubid;
            return;
        }
    });


   return res.json({
       Books:database.books,
       Publication:database.publications,
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

BookStore.delete('/book/delete/:isbn' , (req,res) => {
    const updatedbookdatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatedbookdatabase;
    return res.json({Books:database.books});
});

/*
Route        --> /book/delete/author 
Description  --> delete a author from a book
Access       --> Public
Prameters    --> isbn,authorID
Method       --> DELETE
*/

BookStore.delete('/book/delete/author/:isbn/:authorID' , (req,res) => {
    //update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAthors = book.Authors.filter((author) => author !== parseInt(req.params.authorID));
            book.Authors = newAthors ;
            return;
        }
    });

    //update author database after delete Author from books database
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorID)) {
            const newBookid = author.bookid.filter((bookID) => bookID !== req.params.isbn);
            author.bookid = newBookid;
            return;
        }
    });

    return res.json({Massage:"deleted Sucessfuly",Books:database.books,Authors:database.authors});
});

/*
Route        --> /author/delete 
Description  --> delete a author
Access       --> Public
Prameters    --> authorID
Method       --> DELETE
*/

BookStore.delete('/author/delete/:authorID' , (req,res) => {
    const updateauthordatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorID));
    database.authors = updateauthordatabase ; 
    return res.json({Authors:database.authors});
});

/*
Route        --> /publication/delete 
Description  --> delete a publication
Access       --> Public
Prameters    --> pubID
Method       --> DELETE
*/

BookStore.delete('/publication/delete/:pubID' , (req,res) => {
    const updatepubdatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubID));
    database.publications = updatepubdatabase ; 
    return res.json({Publication:database.publications});
});

/*
Route        --> /publication/delete/book
Description  --> delete a book from publication
Access       --> Public
Prameters    --> pubID
Method       --> DELETE
*/

BookStore.delete('/publication/delete/book/:isbn/:pubID' , (req,res) => {
    //update publication database
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubID)) {
            const newbooklist = publication.bookid.filter((bookID) => bookID !== req.params.isbn );
            publication.bookid = newbooklist;
            return;
        }
    });

    //update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.Publications = 0; //means no publication publish this book
        }
        return;

    });
    return res.json({Books:database.books,Publication:database.publications});
});
BookStore.listen(5000, () => console.log("Server is Running"));

