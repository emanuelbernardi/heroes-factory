import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import heroRoutes from './routes/hero.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/heroes', heroRoutes);

export default app;