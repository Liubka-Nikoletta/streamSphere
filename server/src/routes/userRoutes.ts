import {Router} from 'express';
import {createUser, loginUser} from "../controllers/userController.js";

const userRouters =  Router();

userRouters.post('/createUser', createUser);
userRouters.post('/login', loginUser)

export default userRouters;
