const whitelist = ['https://www.yourwebsite.com','http://127.0.0.1:5500','http:/localhost:3500'];
const corsOptions = {
    origin: (origin: any,callback: any) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) { // no origin is needed to development mode, like localhost
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    } ,
    optionSuccessStatus: 200
}

export default corsOptions;