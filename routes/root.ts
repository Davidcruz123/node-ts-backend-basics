import express, {Response} from "express";
import path from 'path';

const rootRouter = express.Router();
// routes work as a waterfall
rootRouter.get('^/$|index(.html)?',(__,res:Response)=> {                        // regex expresion, it must start with slash and it must end with slash
    // / or index or index.html..... the ? means .html extentions is optional
    res.sendFile(path.join(__dirname,'..','views','index.html')) // important, it is taking this folder as reference
})

rootRouter.get('/new-page(.html)?',(__,res:Response)=> {
    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})

//redirect
rootRouter.get('/old-page(.html)?',(__,res:Response)=> {
    res.redirect(301,'/new-page.html'); // 302 by default
})

export default rootRouter;