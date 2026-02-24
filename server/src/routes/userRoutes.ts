import {Router} from 'express';
import {createUser, loginUser} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const userRouters =  Router();

userRouters.post('/createUser', createUser);
userRouters.post('/login', loginUser);
userRouters.get('/id', verifyToken, (req, res) => {
    const userId = (req as any).user;
    res.send(userId);
});

export default userRouters;
