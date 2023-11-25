const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

const connectionStr = 'mongodb+srv://somar_96:0934491127sS@cluster0.zh1ifjm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes'); // Add user routes if needed

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes); // Use user routes if needed

// Error handling middleware (example)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
