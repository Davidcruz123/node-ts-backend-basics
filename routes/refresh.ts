import express  from "express";
import handleRefreshToken from "../controllers/refreshTokenController";


const refreshRouter = express.Router();

refreshRouter.get('/',handleRefreshToken);
 
export default refreshRouter;