import {Router} from 'express';
import {createUser} from "../controllers/userController.js";

const userRouters =  Router();

userRouters.post('/createUser', createUser);

export default userRouters;
