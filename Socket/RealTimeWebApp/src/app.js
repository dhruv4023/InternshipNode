import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from './config/config.js';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views')); // Adjust the path as per your project structure

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configure CORS policy
app.use(morgan("common")); // Log HTTP requests
app.use(cors()); // Configure CORS for allowed origins

app.get("/", (req, res) => {
  res.render("index", { message: "Server is running..." });
});

// Importing routes
import routes_v1 from './routes/index.routes.js';

// Defining routes
app.use('/api/v1', routes_v1);

export default app;
