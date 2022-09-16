import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
});

class Cars extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('cars', carsMongooseSchema)) {
    super(model); 
  }
}

export default Cars;
