import { Prisma } from '@prisma/client'
import { VehicleRepository } from '../vehicle-repository'
import prisma from '@/lib/prisma'

export class PrismaVehicleRepository implements VehicleRepository {
    async getById(id: string) {
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                id,
            },
        })

        return vehicle
    }

    async getBylicensePlate(licensePlate: string) {
        const vehicle = await prisma.vehicle.findFirst({
            where: {
                licensePlate,
            },
        })

        return vehicle
    }

    async findAll() {
        const vehicles = await prisma.vehicle.findMany()

        return vehicles
    }

    async create(data: Prisma.VehicleCreateInput) {
        const vehicle = await prisma.vehicle.create({
            data,
        })

        return vehicle
    }

    async update(data: Prisma.VehicleUncheckedUpdateInput, vehicleId: string) {
        const updatedVehicle = await prisma.vehicle.update({
            where: {
                id: vehicleId,
            },
            data,
        })

        return updatedVehicle
    }
}
