import  db  from '../models/index.js';

// api logger middleware function
const logger = async (req, res, next) => {
    const obj = {
        api_method: req.method,
        api_url: req.url,
    };
    try {
        await db.api_logs.create(obj);
        next();
    } catch (error) {
        console.log(error);
        next();
    }
};
export { logger };
