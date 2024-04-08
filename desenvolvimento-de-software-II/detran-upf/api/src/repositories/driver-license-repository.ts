import { DriverLicense, Prisma } from '@prisma/client'

export interface DriverLicenseRepository {
    findByUserId(userId: string): Promise<DriverLicense | null>
    findByLicenseNumber(licenseNumber: string): Promise<DriverLicense | null>
    findAll(): Promise<DriverLicense[]>
    create(data: Prisma.DriverLicenseCreateInput): Promise<DriverLicense>
    update(
        data: Prisma.DriverLicenseUncheckedUpdateInput,
        licenseNumber: string,
    ): Promise<DriverLicense>
}
