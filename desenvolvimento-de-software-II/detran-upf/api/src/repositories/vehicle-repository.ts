import { Prisma, Vehicle } from '@prisma/client'

export interface VehicleRepository {
    getById(id: string): Promise<Vehicle | null>
    getBylicensePlate(licensePlate: string): Promise<Vehicle | null>
    findAll(): Promise<Vehicle[]>
    create(data: Prisma.VehicleCreateInput): Promise<Vehicle>
    update(
        data: Prisma.VehicleUncheckedUpdateInput,
        vehicleId: string,
    ): Promise<Vehicle>
}
