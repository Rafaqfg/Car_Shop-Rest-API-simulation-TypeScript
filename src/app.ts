import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/errorHandler';
import CarsRoute from './routes/carsRoute';

const app = express();
app.use(express.json());

app.use(CarsRoute);

app.use(errorHandler);

export default app;
