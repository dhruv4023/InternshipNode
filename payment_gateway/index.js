import Stripe from 'stripe';
import express from "express";
import dotenv from "dotenv";
import path from "path"
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route for rendering the index page
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/charge', async (req, res) => {
  try {
    
    const paymentIntent = await stripe.paymentIntents.create(req.body);

    // Render success page
    res.render('success', { paymentIntent });
  } catch (err) {
    // Render error page
    res.render('error', { error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
