import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";

export default cloudinary.config({
    cloud_name: config.cloudnary.name,
    api_key: config.cloudnary.key,
    api_secret: config.cloudnary.api_secret,
});
