import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, status, buyValue, seatsQty, doorsQty } = req.body;
    const car = { model, year, color, status, buyValue, seatsQty, doorsQty };
    const result = await this._service.create(car);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const car = await this._service.readOne(id);
    return res.status(200).json(car);
  }

  public async update(req: Request, res: Response<ICar>) {
    const carUpdates = req.body;
    const { id } = req.params;
    const car = await this._service.update(id, carUpdates);
    return res.status(200).json(car);
  }

  public async delete(req: Request, res: Response<ICar[]>) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }  
}