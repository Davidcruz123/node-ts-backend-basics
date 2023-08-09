import express, {Response} from "express";
import path from 'path';

const router = express.Router();

router.get('^/$|index(.html)?',(__,res:Response)=> {
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
})

router.get('/test(.html)?',(__,res:Response)=> {
    res.sendFile(path.join(__dirname,'..','views','subdir','test.html'))
})


export default router;