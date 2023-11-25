// expenseRoutes.js

const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');


router.get('/all', async (req, res) => {
    try {
      const expenses = await Expense.find(); // Retrieve all expenses from the database
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Add Expense - POST request
router.post('/add', async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Expense - PUT request
router.put('/edit/:expenseId', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseId, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Expense - DELETE request
router.delete('/delete/:expenseId', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
