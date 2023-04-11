const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
// const authroute = require('./Routes/authroute');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
// }).then(() => {
//     console.log('DB connection Successful');
// }).catch(doc => {
//     console.log(`Error` + doc);
// })
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(upload());

app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());

app.set('layout', 'layout/layout');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT || 5000;


// app.use('/', authroute);
app.use('/', route);

app.use((err, req, res, next) => {
    let error = { ...err }
    if (error.name === 'JsonWebTokenError') {
        err.message = "please login again";
        err.statusCode = 401;
        return res.status(401).redirect('view/login');
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'errors';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

    })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));