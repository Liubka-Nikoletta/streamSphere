import express from 'express';
import dotenv from 'dotenv';
import connectToStreamSchemeDB from "./db.js";
import userRouters from './routes/userRoutes.js';

dotenv.config();

const app = express();

connectToStreamSchemeDB();

app.use(express.json());

app.use('/api/users', userRouters);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})