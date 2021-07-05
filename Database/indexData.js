let books = [{
    ISBN:"101",
    Title:"RICH DAD POOR DAD",
    Authors:[1,2],
    Language:"English",
    PubDate:"1997",
    NumOfPages:207,
    Category:["Personal finance","Business","Investing"],
    Publications:1
},
{
    ISBN:"102",
    Title:"The Intelligent Investor",
    Authors:[3],
    Language:"English",
    PubDate:"1949",
    NumOfPages:640,
    Category:["Value Investing","Stock Market","Investing"],
    Publications:2
},
{
    ISBN:"103",
    Title:"Guide to Investing",
    Authors:[1],
    Language:"English",
    PubDate:"2002",
    NumOfPages:490,
    Category:["Value Investing","Investing"],
    Publications:3
},
{
    ISBN:"104",
    Title:"The Warren Buffett Way",
    Authors:[4],
    Language:"English",
    PubDate:"2013",
    NumOfPages:320,
    Category:["Business","Investing"],
    Publications:3
}
];



const authors = [{
    id:1,
    name:"Robert Kiyosaki",
    bookid:["101","103"]
},
{
    id:2,
    name:"Sharon L. Lechter",
    bookid:["101"]
},
{
    id:3,
    name:"Benjamin Graham",
    bookid:["102"]
},
{
    id:4,
    name:"Robert G. Hagstrom",
    bookid:["104"]
}

];



const publications = [{
    id:1,
    name:"Warner Books",
    bookid:["101"]
},
{
    id:2,
    name:"Harper & Brothers",
    bookid:["102"]
},
{
    id:3,
    name:"Plata Publishing",
    bookid:["103","104"]
},
{
    id:4,
    name:"My Publication",
    bookid:[]
}
];

module.exports = {books,authors,publications};