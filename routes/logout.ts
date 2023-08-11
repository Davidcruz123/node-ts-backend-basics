import express  from "express";
import handleLogout from "../controllers/logoutControler";



const logoutRouter = express.Router();

logoutRouter.get('/',handleLogout);
 
export default logoutRouter;