import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const CarsRoute = Router();

const car = new CarsModel();
const carService = new CarsService(car);
const carController = new CarsController(carService);

CarsRoute.post('/cars', (req, res) => carController.create(req, res));

export default CarsRoute;