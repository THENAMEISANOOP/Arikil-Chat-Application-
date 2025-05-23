import express from 'express';
import "dotenv/config";
const app = express(); 
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';
const PORT = process.env.PORT || 5001;
import cors from 'cors';

import cookieParser from 'cookie-parser';

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // allow frontend to access cookies
})); // for cross-origin requests
app.use(express.json()); 
app.use(cookieParser()); // for parsing application/json

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);



app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  connectDB();
});