// Expense.js in models folder

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: Date,
  // Add other fields as needed
});

module.exports = mongoose.model('Expense', expenseSchema);
