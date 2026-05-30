import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import heroRoutes from './routes/hero.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/heroes', heroRoutes);

app.use(errorMiddleware);

export default app;