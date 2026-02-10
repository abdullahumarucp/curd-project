const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/items');
const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crud-app';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/items', itemsRouter); //  items route
app.use('/api/auth', authRouter); // Authentication routes (register, login)
app.use('/api/projects', projectsRouter); // Projects CRUD routes (protected)
app.use('/api/tasks', tasksRouter); // Tasks CRUD routes (protected)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
