import { z } from 'zod';
import VehicleSchema from './IVehicle';

const MotorcycleSchema = VehicleSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().max(250),
}));

type IMotorcycle = z.infer<typeof MotorcycleSchema>;

export default MotorcycleSchema;
export { IMotorcycle };
