import { Prisma, Vehicle } from '@prisma/client'

export interface VehicleRepository {
    getVehicleById(id: string): Promise<Vehicle | null>
    getVehicleByPlaca(placa: string): Promise<Vehicle | null>
    getVehicles(): Promise<Vehicle[]>
    create(data: Prisma.VehicleCreateInput): Promise<Vehicle>
    update(
        data: Prisma.VehicleUncheckedUpdateInput,
        vehicleId: string,
    ): Promise<Vehicle>
}
