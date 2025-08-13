require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoutes');
const menuItemRoute = require('./routes/menuItemRoutes');


const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

// Routes
app.use('/auth', userRoute);
app.use('/api', orderRoute);
app.use('/api', menuItemRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});