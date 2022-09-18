import { z } from 'zod';
import VehicleSchema from './IVehicle';

const CarSchema = VehicleSchema.merge(z.object({
  doorsQty: z.number().int().positive().gte(2)
    .lte(4),
  seatsQty: z.number().int().positive().gte(2)
    .lte(7),
}));

type ICar = z.infer<typeof CarSchema>;

export default CarSchema;
export { ICar };
