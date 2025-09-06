require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Mongostore = require('connect-mongo');
const pino = require('pino-http')();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoutes');
const orderRoute = require('./routes/orderRoutes');
const menuItemRoute = require('./routes/menuItemRoutes');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(pino);
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
// app.use(session({
//     secret: 'Keyboard Dog',
//     resave: false,
//     saveUninitialized:true,
//     store:Mongostore.create({
//         mongoUrl:process.env.MONGODB_URI
//     })
// }));

// Routes
app.use('/auth', userRoute);
app.use('/api', orderRoute);
app.use('/api', menuItemRoute);




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});