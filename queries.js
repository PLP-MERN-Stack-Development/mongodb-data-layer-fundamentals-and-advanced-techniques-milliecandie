// queries.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://plp_user:Plp39336157@cluster0.n7fkyl3.mongodb.net/plp_bookstore?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1. Find all Programming books
    console.log("Programming books:");
    console.log(await books.find({ genre: "Programming" }).toArray());

    // 2. Books published after 2010
    console.log("Books published after 2010:");
    console.log(await books.find({ published_year: { $gt: 2010 } }).toArray());

    // 3. Books by Robert C. Martin
    console.log("By Robert C. Martin:");
    console.log(await books.find({ author: "Robert C. Martin" }).toArray());

    // 4. Update price of Clean Code
    await books.updateOne({ title: "Clean Code" }, { $set: { price: 55 } });
    console.log("Updated Clean Code price.");

    // 5. Delete book "Design Patterns"
    await books.deleteOne({ title: "Design Patterns" });
    console.log("Deleted Design Patterns.");

    // 6. Complex query (in stock + after 2010)
    console.log("In-stock books after 2010:");
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    // 7. Projection
    console.log("Projection (title, author, price only):");
    console.log(await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    // 8. Sorting
    console.log("Sorted by price ascending:");
    console.log(await books.find().sort({ price: 1 }).toArray());

    console.log("Sorted by price descending:");
    console.log(await books.find().sort({ price: -1 }).toArray());

    // 9. Pagination
    console.log("Page 1 (5 books):");
    console.log(await books.find().skip(0).limit(5).toArray());

    console.log("Page 2 (next 5 books):");
    console.log(await books.find().skip(5).limit(5).toArray());

    // 10. Aggregations
    console.log("Average price by genre:");
    console.log(await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());

    console.log("Top author:");
    console.log(await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray());

    // 11. Indexes
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: -1 });
    console.log("Indexes created.");
  } finally {
    await client.close();
  }
}

run();