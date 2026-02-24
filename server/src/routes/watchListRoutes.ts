import {Router} from 'express';
import {addToWatchList, getWatchList, removeFromWatchList} from "../controllers/watchListController.js";
import verifyToken from "../middleware/authMiddleware.js";

const watchListRouter = Router();

watchListRouter.get('/', verifyToken, getWatchList);
watchListRouter.post('/add', verifyToken, addToWatchList);
watchListRouter.delete('/remove', verifyToken, removeFromWatchList);

export default watchListRouter;
