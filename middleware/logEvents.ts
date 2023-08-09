
import  { Request, Response,NextFunction } from 'express';
const {format} = require('date-fns');
const {v4: uuid} = require('uuid'); // it means import v4 as uuid, it is an alias
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message:string, logName:string) => {
    console.log('logger executed')
    const dateTime = `${format( new Date, 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname,'..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem);
    }catch(err) {
        console.log(err)
    }
};

const logger = (req:Request,_res:Response,next:NextFunction)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t ${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export  {logger, logEvents}
