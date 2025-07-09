import express from 'express';
import 'dotenv/config';
import { connectdb } from './config/db.js';
import transactionsRoute from './routes/transactionsRoute.js';
import rateLimiter from './middleware/rateLimiter.js';


const app = express();


// middleware
app.use(rateLimiter);
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/transactions", transactionsRoute);

connectdb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
})

