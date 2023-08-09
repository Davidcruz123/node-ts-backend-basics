import  { Request, Response,NextFunction } from 'express';
import { logEvents } from './logEvents';


const errorHandler = (err:any,_req: Request,res: Response,_next: NextFunction):void=> {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.status(500).send(err.message);// it sends the error 
}

export default errorHandler;