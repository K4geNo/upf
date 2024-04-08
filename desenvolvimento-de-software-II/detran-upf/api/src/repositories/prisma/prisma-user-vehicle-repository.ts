import prisma from '@/lib/prisma'
import { UserVehicleRepository } from '../user-vehicle'
import { Vehicle } from '@prisma/client'

export class PrismaUserVehicleRepository implements UserVehicleRepository {
    async findUserVehicle(userId: string): Promise<Vehicle | null> {
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                userVehicle: {
                    some: {
                        userId,
                    },
                },
            },
        })

        return vehicle
    }

    async save(userId: string, vehicleId: string): Promise<void> {
        await prisma.userVehicle.upsert({
            where: {
                userId_vehicleId: {
                    userId,
                    vehicleId,
                },
            },
            update: {},
            create: {
                userId,
                vehicleId,
            },
        })
    }
}
