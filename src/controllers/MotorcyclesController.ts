import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, status, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { model, year, color, status, buyValue, category, engineCapacity };
    const result = await this._service.create(motorcycle);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    if (!motorcycles) return [];
    return res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const motorcycle = await this._service.readOne(id);
    return res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const motorcycleUpdates = req.body;
    const { id } = req.params;
    const motorcycle = await this._service.update(id, motorcycleUpdates);
    return res.status(200).json(motorcycle);
  }

  public async delete(req: Request, res: Response<IMotorcycle[]>) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }  
}