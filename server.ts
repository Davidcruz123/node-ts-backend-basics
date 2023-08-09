import express from 'express';
import path from 'path';
import {logger} from './middleware/logEvents';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import router from './routes/subdir';
import rootRouter from './routes/root';
import employeesRouter from './routes/api/employees';
import corsOptions from './config/corsOptions';
const app = express();
const PORT = 3500;


// custom middleware
app.use(logger)
// Cross Origin Resource Sharing

app.use(cors(corsOptions))

// built in middleware
app.use(express.urlencoded({extended:false}))// get data when form data is submitted
app.use(express.json());
// serve static files
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

// routes
app.use('/',rootRouter)
app.use('/subdir',router)
app.use('/employees', employeesRouter)

// error handling
app.all('*',(req,res)=> {   
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if (req.accepts('json')) {
        res.json({err:'404 Not found'})
    } else {
        res.type('txt').send('404 Not found');
    }
})
// using middleware
app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})






// // chain
// const one = (_req:Request,_res:Response,next:NextFunction) => {
//     console.log('one');
//     next()
// }
// const two = (_req:Request,_res:Response,next:NextFunction) => {
//     console.log('two');
//     next()
// }
// const three = (_req:Request,res:Response,_next:NextFunction) => {
//     console.log('three');
//     res.send('Finished')
// }

// app.get('/chain',[one,two,three])