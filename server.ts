import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import { logger } from './middleware/logEvents';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import router from './routes/subdir';
import rootRouter from './routes/root';
import employeesRouter from './routes/api/employees';
import corsOptions from './config/corsOptions';
import registerRouter from './routes/register';
import authRouter from './routes/auth';
import veryfyJWT from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import refreshRouter from './routes/refresh';
import logoutRouter from './routes/logout';
import credentials from './middleware/credentials';
import mongoose from 'mongoose';
import connectDb from './config/dbConn';
dotenv.config(); // it does not have to be imported in each file
const app = express();
const PORT = 3500;

//Conenct to Mongodb
connectDb();

// custom middleware
app.use(logger);
// Handle options credentials check before CORS! and fetch cookies credentials requirements
// it goes before cors, because if that header is not set, it throws error
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));// get data when form data is submitted
// built in middleware for json
app.use(express.json());
//midleware for cookies
app.use(cookieParser())


// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public'))); // this is on the route /subdir use the /public directory

// routes
// app.user supports regex
app.use('/', rootRouter);
app.use('/subdir', router); // just a test router
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(veryfyJWT); //now all employees routes are protected by jwt
app.use('/employees', employeesRouter);
// error handling
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html')) // always we are sending a file, express understands it is right, so sends 200 status code, that's why we need to change it.
    } else if (req.accepts('json')) {
        res.json({ err: '404 Not found' })
    } else {
        res.type('txt').send('404 Not found');
    }
});
// using middleware
app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`) 
    });

})

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Improvment:besides you log out, it lets you see all employees



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


