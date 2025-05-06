import mongoose from 'mongoose';
export const connectDB = async () => {  
    try {
      const conn=  await mongoose.connect(process.env.MONGO_URI); 
        console.log(`mongoDB connected`)
    } catch (error) {
        console.log("MongoDB connection error: "+ error.message);
        process.exit(1); // Exit process with failure
    }
  }