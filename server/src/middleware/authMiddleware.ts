import jwt from 'jsonwebtoken';
import express, {NextFunction} from 'express';
import {Request, Response} from 'express';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Invalid token' });

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string};

        (req as any).user = decoded.id;

        next();
    }catch(err) {
        res.status(401).json({message: 'Unauthorized'});
    }
}