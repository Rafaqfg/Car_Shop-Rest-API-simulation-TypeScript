import { Router } from 'express';
import MotorcyclesController from '../controllers/MotorcyclesController';
import MotorcyclesModel from '../models/MotorcyclesModel';
import MotorcyclesService from '../services/MotorcyclesService';

const MotorcycleRoute = Router();

const motorcycle = new MotorcyclesModel();
const motorcycleService = new MotorcyclesService(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

MotorcycleRoute.delete('/:id', (req, res) => motorcycleController.delete(req, res));
MotorcycleRoute.put('/:id', (req, res) => motorcycleController.update(req, res));
MotorcycleRoute.get('/:id', (req, res) => motorcycleController.readOne(req, res));
MotorcycleRoute.post('/', (req, res) => motorcycleController.create(req, res));
MotorcycleRoute.get('/', (req, res) => motorcycleController.read(req, res));

export default MotorcycleRoute;