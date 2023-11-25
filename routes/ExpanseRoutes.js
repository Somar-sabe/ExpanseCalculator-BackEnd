// expenseRoutes.js

const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');




// pdfdownload
const PDFDocument = require('pdfkit');

// ... Other existing routes ...

router.get('/pdf-download/:userId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userExpenses = await Expense.find({
      userId: req.params.userId,
      date: { $gte: new Date(startDate), $lt: new Date(endDate) }
    });

    const doc = new PDFDocument();
    // Build the PDF document using fetched userExpenses data
    // Example: doc.text(`Expense report for user ${req.params.userId}`);
    // ...

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="expense_report.pdf"');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


// monthly reportes
router.get('/monthly/:userId', async (req, res) => {
    try {
      const { year, month } = req.query; // Get year and month from query parameters
      const userExpenses = await Expense.find({
        userId: req.params.userId,
        date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) }
      });
      res.status(200).json(userExpenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

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
