import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';

const CarsRoute = Router();

const car = new CarsModel();
const carService = new CarsService(car);
const carController = new CarsController(carService);

CarsRoute.put('/cars/:id', (req, res) => carController.update(req, res));
CarsRoute.get('/cars/:id', (req, res) => carController.readOne(req, res));
CarsRoute.post('/cars', (req, res) => carController.create(req, res));
CarsRoute.get('/cars', (req, res) => carController.read(req, res));

export default CarsRoute;