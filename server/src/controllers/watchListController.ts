import {Request, Response, NextFunction} from 'express';
import {User} from "../models/User.js";

export const getWatchList = async (req: Request, res: Response) => {
   try{
       const userId = (req as any).user;
       const user = await User.findById(userId).select('watchList');

       res.status(200).json(user?.watchList || []);
   }catch(err){
       res.status(500).json({ message: "Error fetching data" });
   }
}

export const addToWatchList = async (req: Request, res: Response, next: NextFunction) => {
    try{
        if(!req.body){
            return res.status(400).json({ message: "Body is missing" });
        }
        const {movieId} = req.body;
        const userId = (req as any).user;

        const user = await User.findByIdAndUpdate(
            userId,
            {$addToSet: {watchList: movieId}},
            {new: true}
        )

        res.status(200).json(user?.watchList);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
}

export const removeFromWatchList = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {movieId} = req.body;
        const userId = (req as any).user;

        const user = await User.findByIdAndUpdate(
            userId,
            {$pull: {watchList: movieId}},
            {new: true}
        )

        res.status(200).json(user?.watchList);
    }catch(err){
        res.status(401).json({message: 'Error deleting movie'});
    }
}