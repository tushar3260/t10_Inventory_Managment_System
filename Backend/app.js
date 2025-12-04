import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './models/db.js';
import dotenv from 'dotenv';
dotenv.config();
db();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
app.get("/", (req, res) => {
    res.send("API is running...");

});


export default app;

