import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/errorHandler';
import CarsRoute from './routes/carsRoute';
import MotorcycleRoute from './routes/motorcyclesRoute';

const app = express();
app.use(express.json());

app.use(CarsRoute);

app.use('/motorcycles', MotorcycleRoute);

app.use(errorHandler);

export default app;
