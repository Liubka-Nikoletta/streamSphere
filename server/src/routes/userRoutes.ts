import {Router} from 'express';
import {createUser, loginUser} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const userRouter =  Router();

userRouter.post('/createUser', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/id', verifyToken, (req, res) => {
    const userId = (req as any).user;
    res.send(userId);
});

export default userRouter;
