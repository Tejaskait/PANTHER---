import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';


connect()
const app = express();
app.use(morgan('dev'))
app.use((cors()));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRoutes)
app.use('/projects', projectRoutes);

export default app;