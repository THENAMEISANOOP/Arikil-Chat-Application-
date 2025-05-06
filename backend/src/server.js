import express from 'express';
import "dotenv/config";
const app = express(); 
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
const PORT = process.env.PORT || 5001;

import cookieParser from 'cookie-parser';

app.use(express.json()); 
app.use(cookieParser()); // for parsing application/json

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});