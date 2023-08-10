import express  from "express";
import handleLogin from "../controllers/authControler";

const authRouter = express.Router();

authRouter.post('/',handleLogin);
 
export default authRouter;