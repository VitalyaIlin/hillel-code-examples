import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Author schema
const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Define the Book schema, with a reference to the Author model
const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Reference to the Author model
  },
});

// Create models for Author and Book
const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

// Example function to demonstrate the usage of populate
async function demoPopulate() {
  // Create an author
  const newAuthor = new Author({
    name: 'J.K. Rowling',
    age: 55,
  });
  await newAuthor.save();

  // Create a book that references the author
  const newBook = new Book({
    title: 'Harry Potter and the Sorcerer\'s Stone',
    pages: 309,
    author: newAuthor._id, // Reference the author's ObjectId
  });
  await newBook.save();

  // Fetch the book and populate the author details
  const bookWithAuthor = await Book.findOne({ title: 'Harry Potter and the Sorcerer\'s Stone' }).populate('author');

  console.log(bookWithAuthor);
}

// Run the demo function
demoPopulate().then(() => mongoose.disconnect());
