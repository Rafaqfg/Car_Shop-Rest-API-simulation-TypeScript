import { IService } from '../interfaces/IService';
import CarSchema, { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarsService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(private model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar):Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const carsList = this._car.read();
    return carsList;
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error();
    return car;
  }

  public async update(_id:string, obj: ICar): Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const carUpdated = await this._car.update(_id, obj);
    if (!carUpdated) throw new Error();
    return carUpdated;
  }

  public async delete(_id: string): Promise<ICar> {
    const carDeleted = await this._car.delete(_id);
    if (!carDeleted) throw new Error();
    return carDeleted;
  }
}

export default CarsService;
