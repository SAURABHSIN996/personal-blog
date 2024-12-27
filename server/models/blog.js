//models are used for defining database schema
//We are going to use mongoose which is a ODM (object Data modelling) library which helps in communicating efficiently with mongo DB

const mongoose = require('mongoose');

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: { type: String }, 
  headings: { type: [String] },  // Array of headings
  subheadings: { type: [String] }, // Array of subheadings
  blogText: { type: String, required: true }, // Main blog content
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('blog', blogSchema);
