import { Vehicle } from '@prisma/client'

export interface UserVehicleRepository {
    findUserVehicle(userId: string): Promise<Vehicle | null>
    save(userId: string, vehicleId: string): Promise<void>
}
