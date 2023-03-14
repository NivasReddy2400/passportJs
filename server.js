const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const crypto = require('crypto')
const routes = require('./routes')
const connection = require('./config/database');

const MongoStore = require('connect-mongo');

require('dotenv').config();


const app = express()

app.use(express.json());
app.use(express.urlencoded());

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
    cookie:{
        maxAge:86400000,
    }
}));