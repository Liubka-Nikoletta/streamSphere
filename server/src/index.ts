import express from 'express';
import dotenv from 'dotenv';
import connectToStreamSchemeDB from "./db.js";
import userRouter from './routes/userRoutes.js';
import watchListRouter from './routes/watchListRoutes.js';

dotenv.config();

const app = express();

connectToStreamSchemeDB();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/watchList', watchListRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})