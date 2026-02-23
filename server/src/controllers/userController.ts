import {Request, Response, NextFunction} from 'express';
import {User} from '../models/User.js';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {userName, email, password} = req.body;

        const newUser = new User({userName, email, password});

        await newUser.save();

        res.status(201).json(newUser);
    } catch (err){
        res.status(400).send({message: 'Помилка при створенні' });
    }
}