//API FOR A BOOK MANAGEMENT SYSTEM
const express= require("express");
const database = require("./database");
var bodyParser = require("body-parser");
//Initialise
const booky = express();
booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());

/*
Route          /
Description    get all the BOOKS
Access         Public
Parameters     None
Method         get
*/
booky.get("/", (req,res)=>{
  return res.json({books:database.books});
});
/*
Route          /is
Description    get specific BOOKS
Access         Public
Parameters     isbn
Method         get
*/
booky.get("/is/:isbn", (req,res)=> {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});

  }
  return res.json({book:getSpecificBook});
});
/*
Route          /c
Description    get specific BOOKS based on category
Access         Public
Parameters     category
Method         get
*/
booky.get("/c/:category", (req , res)=>{
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  )
  if(getSpecificBook.length === 0){
    return res.json({error: `No book found for the category ${req.params.category}`})
  }
  return res.json({book : getSpecificBook});
});
/*
Route          /c
Description    get specific BOOKS based on category
Access         Public
Parameters     category
Method         get
*/
booky.get("/l/:language", (req,res)=>{
  const getSpecificBook=database.books.filter(
    (book)=> book.language === req.params.language
  );
  if(getSpecificBook.length===0){
    return res.json({error: `No book found of this language ${req.params.language}`});
  }
  return res.json({book: getSpecificBook})
});
/*
Route          /author
Description    get all the auhtors
Access         Public
Parameters     None
Method         get
*/
booky.get("/author",(req,res)=>{
  return res.json({authors: database.author});

});
/*
Route          /author
Description    get specific auhtor
Access         Public
Parameters     id
Method         get
*/
booky.get("/author/:id",(req,res)=>{
  const getSpecificAuthor = database.author.filter(
    (author) => author.Id === parseInt( req.params.id)
  );
  if(getSpecificAuthor.length ===0){
    return res.json({error: `no book found for requested author of id ${req.params.id}`});
  };
  return res.json({author: getSpecificAuthor});
});
/*
Route          /author/book
Description    get specific auhtors based on book
Access         Public
Parameters     isbn
Method         get
*/
booky.get("/author/book/:isbn",(req,res)=>{
  const getSpecificAuthor= database.author.filter(
    (author)=> author.books.includes(req.params.isbn)
  )
  if(getSpecificAuthor.length===0){
    return res.json({error: ` no author found for the book ${req.params.isbn}`});
  }
  return res.json({author: getSpecificAuthor});
});
/*
Route          /publications
Description    get all publications
Access         Public
Parameters     None
Method         get
*/
booky.get("/publications",(req,res)=>{
  return res.json({publications: database.publication});
});
/*
Route          /p
Description    get specific publications
Access         Public
Parameters     id
Method         get
*/
booky.get("/p/:id", (req,res)=>{
  const getSpecificPublication = database.publication.filter(
    (publication)=> publication.id === parseInt(req.params.id)
  )
  if(getSpecificPublication.length===0){
    return res.json({error: `no book found for publication ${req.params.id}`})
  };
  return res.json({publication: getSpecificPublication});
});
/*
Route          /p
Description    get specific publications
Access         Public
Parameters     id
Method         get
*/
booky.get("/publication/book/:isbn",(req,res)=>{
  const getSpecificPublication = database.publication.filter(
    (publication)=> publication.books.includes(req.params.isbn)
  )
  if(getSpecificPublication.length===0){
    return res.json({error : `no publication for book ${req.params.isbn}`})
  }
  return res.json({publication:getSpecificPublication})
});

/*****POST REQUEST USING POSTMAN*****/
// 1. Add new books
// 2. Add new Author
// 3. Add new publication
/*
Route          /book/new
Description    add new book
Access         Public
Parameters     none
Method         POST
*/
booky.post("/book/new", (req,res)=>{
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});
/*
Route          /author/new
Description    add new author
Access         Public
Parameters     none
Method         POST
*/
booky.post("/author/new",(req,res)=>{
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json({updatedAuthor: database.author})
});
/*
Route          /publication/new
Description    add new publication
Access         Public
Parameters     none
Method         POST
*/
booky.post("/publication/new", (req,res)=>{
  const newPublication = req.body ;
  database.publication.push(newPublication);
  return res.json({updatedPublication : database.publication});
});
/******PUT********/
// Update book details if publication  is changed
// Here we have two tasks
// update publication database
// update book database
/*
Route          /publication/update/book
Description    update a book details
Access         Public
Parameters     ISBN
Method         PUT
*/
booky.put("/publication/update/book/:isbn",(req,res)=>{
  // update publication database
  database.publication.forEach((publication)=>{
    if(publication.id=== req.body.publicationId){
      return publication.books.push(req.params.isbn);
    }
  });
  // Update book database
  database.books.forEach((book)=>{
    if(book.ISBN=== req.params.isbn){
      book.publication = req.body.publicationId;
      return;
    }
  });
  return res.json({
    books: database.books ,
    publications: database.publication



  });


});
/*******DELETE******/
// Delete a book
/*
Route          /book/delete
Description    delete a book
Access         Public
Parameters     ISBN
Method         DELETE
*/
booky.delete("/book/delete/:isbn",(req,res)=>{
  //whichever book that doesn't match with the isbn just send will be filtered
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;
  return res.json({books: database.books});
});



booky.listen(3000,()=> {
  console.log("server is up and running");
});
