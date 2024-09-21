const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config({path:'config/.env'});

// Connect to MongoDB
connectDB();

const app = express();
const options = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors(options));

// Routes
app.use('/api/classes', require('./routes/classRoute'));
app.use('/api/teachers', require('./routes/teacherRoute'));
app.use('/api/students', require('./routes/studentRoute'));
app.use('/api/auth', require('./routes/userRoute'))

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
