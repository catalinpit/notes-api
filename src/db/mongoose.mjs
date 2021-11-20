import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

mongoose.connect(process.env.DB_URI)
    .then(res => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Error connecting to the database:', err.message);
    });