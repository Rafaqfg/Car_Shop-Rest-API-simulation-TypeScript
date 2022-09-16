import express from 'express';
import 'express-async-errors';
import CarsRoute from './routes/carsRoute';

const app = express();
app.use(express.json());

app.use(CarsRoute);

export default app;
