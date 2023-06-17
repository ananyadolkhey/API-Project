const books = [
  {
    ISBN : "12345Book",
    title : "Tesla!!!",
    pubDate : "2021-08-05",
    language : "en",
    numPage : 300,
    author : [1,2],
    publications : [1],
    category : ["tech","space","education"]
  },
  {
    ISBN : "secretBook",
    title : "secrets",
    pubDate : "2020-08-05",
    language : "german",
    numPage : 190,
    author : [1],
    publications : [2],
    category : ["suspense","thrill","dark"]
  }


]

const author = [
  {
    Id : 1 ,
    name : "Anna",
    books : ["12345Book", "secretBook"]
  },
  {
    Id : 2 ,
    name : "Johan",
    books : ["12345Book"]
  }

]

const publication = [
  {
    id : 1,
    name: "writex",
    books : ["12345Book"]
  },
  {
    id : 2,
    name: "pentex",
    books : ["secretBook"]

  },
  {
    id : 3,
    name: "writex2",
    books : []
  }
]

module.exports = {books,author,publication};
