import dotenv from 'dotenv';
dotenv.config();

export default {
    // database details
    database: {
        db_url: process.env.DB_URL || 'mongodb://localhost:27017,localhost:27018,localhost:27019/test?' + 'replicaSet=rs',
        db_name: process.env.DB_NAME,
    },
    //  ssl Keys details
    certificate: {
        privkey: process.env.SERVER_KEY || 'path to priv key',
        fullchain: process.env.SERVER_CERT || 'path to fullchain key',
    },
    protocol: process.env.PROTOCOL || 'http',
    port: process.env.APP_PORT || 8088,
    app_base_url: process.env.APP_BASE_URL || 'http://localhost:8088/api/v1',
    app_project_path: process.env.APP_PROJECT_PATH || 'http://localhost:4040',
    node_env: process.env.NODE_ENV || 'development',
    origin_url_list: process.env.ORIGIN_URL_LIST || '[ "http://localhost:3000" ]',
    jwt_secret: process.env.JWT_SECRET,
    micro_services: {
        auth_api_end: process.env.AUTH_API_END,
    }
};
