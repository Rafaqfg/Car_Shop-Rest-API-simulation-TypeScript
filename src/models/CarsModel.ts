import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
  status: Boolean,
}, { versionKey: false });

class CarsModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('cars', carsMongooseSchema)) {
    super(model); 
  }
}

export default CarsModel;
