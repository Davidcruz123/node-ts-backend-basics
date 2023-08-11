import allowedOrigins from "./allowedOrigins";

const corsOptions = {
    origin: (origin: any,callback: any) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) { // no origin is needed to development mode, like localhost
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    } ,
    optionSuccessStatus: 200
}

export default corsOptions;