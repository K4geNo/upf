import { DriverLicenseRepository } from '../driver-license-repository'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

export class PrismaDriverLicenseRepository implements DriverLicenseRepository {
    async findByUserId(userId: string) {
        const driverLicense = await prisma.driverLicense.findFirst({
            where: {
                userId,
            },
        })

        return driverLicense
    }

    async findByLicenseNumber(licenseNumber: string) {
        const driverLicense = await prisma.driverLicense.findFirst({
            where: {
                number: licenseNumber,
            },
        })

        return driverLicense
    }

    async findAll() {
        const driverLicenses = await prisma.driverLicense.findMany()

        return driverLicenses
    }

    async create(data: Prisma.DriverLicenseCreateInput) {
        const driverLicense = await prisma.driverLicense.create({
            data,
        })

        return driverLicense
    }

    async update(
        data: Prisma.DriverLicenseUncheckedUpdateInput,
        licenseNumber: string,
    ) {
        const driverLicense = await prisma.driverLicense.update({
            where: {
                number: licenseNumber,
            },
            data,
        })

        return driverLicense
    }
}
