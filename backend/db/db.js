import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


function connect(){
    mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });
}

export default connect;