// insert_books.js
const { MongoClient } = require("mongodb");

// Replace <password> with your actual password
const uri = "mongodb+srv://plp_user:Plp39336157@cluster0.n7fkyl3.mongodb.net/plp_bookstore?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // Insert 10 books
    const result = await books.insertMany([
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 50,
        in_stock: true,
        pages: 464,
        publisher: "Prentice Hall"
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        genre: "Programming",
        published_year: 1999,
        price: 45,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      {
        title: "You Don’t Know JS",
        author: "Kyle Simpson",
        genre: "Programming",
        published_year: 2015,
        price: 35,
        in_stock: false,
        pages: 278,
        publisher: "O’Reilly Media"
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        genre: "Software Engineering",
        published_year: 1994,
        price: 60,
        in_stock: true,
        pages: 395,
        publisher: "Addison-Wesley"
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        genre: "Algorithms",
        published_year: 2009,
        price: 80,
        in_stock: true,
        pages: 1312,
        publisher: "MIT Press"
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        genre: "Programming",
        published_year: 2008,
        price: 25,
        in_stock: true,
        pages: 176,
        publisher: "O’Reilly Media"
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        genre: "Software Engineering",
        published_year: 1999,
        price: 65,
        in_stock: true,
        pages: 448,
        publisher: "Addison-Wesley"
      },
      {
        title: "Deep Learning",
        author: "Ian Goodfellow",
        genre: "AI",
        published_year: 2016,
        price: 90,
        in_stock: false,
        pages: 800,
        publisher: "MIT Press"
      },
      {
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell",
        genre: "AI",
        published_year: 2010,
        price: 100,
        in_stock: true,
        pages: 1152,
        publisher: "Pearson"
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        genre: "Programming",
        published_year: 2018,
        price: 40,
        in_stock: true,
        pages: 472,
        publisher: "No Starch Press"
      }
    ]);

    console.log(`${result.insertedCount} books inserted successfully`);
  } finally {
    await client.close();
  }
}

run();