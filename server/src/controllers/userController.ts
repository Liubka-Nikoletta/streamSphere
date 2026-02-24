import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
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

export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
   try{
       const {email, password} = req.body;

       const user = await User.findOne({email}).select('+password');
       if (!user) return res.status(401).json({message: 'User not found' });

       const isMatch = await user.comparePassword(password);
       if(!isMatch) return res.status(401).json({message: 'Invalid email or password' });

       const token = jwt.sign(
           {id: user._id},
           process.env.JWT_SECRET!,
           {expiresIn: '24h'}
       )

       res.json({token});
   }catch(err){
       res.status(401).json({message: 'Invalid email or password'});
   }
}

