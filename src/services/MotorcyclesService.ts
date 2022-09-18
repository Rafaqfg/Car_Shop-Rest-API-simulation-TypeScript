import { IService } from '../interfaces/IService';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import MotorcycleSchema, { IMotorcycle } from '../interfaces/IMotorcycle';

class MotorcyclesService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;

  constructor(private model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle):Promise<IMotorcycle> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycleList = this._motorcycle.read();
    return motorcycleList;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id:string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const motorcycleUpdated = await this._motorcycle.update(_id, obj);
    if (!motorcycleUpdated) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const motorcycleDeleted = await this._motorcycle.delete(_id);
    if (!motorcycleDeleted) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleDeleted;
  }
}

export default MotorcyclesService;
