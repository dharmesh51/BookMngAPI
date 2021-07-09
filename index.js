require("dotenv").config();
//Frame work
const express = require('express');
const mongoose = require('mongoose');


//Microservices Routes
const BookRoute = require("./API/Book");
const AuthorRoute = require("./API/Author");
const PubRoute = require("./API/Publication");
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

//Initializing Microservices

BookStore.use("/book", BookRoute);
BookStore.use("/author", AuthorRoute);
BookStore.use("/publication", PubRoute);

BookStore.listen(5000, () => console.log("Server is Running"));

