import { DriverLicense, Prisma } from '@prisma/client'

import { DriverLicenseRepository } from '@/repositories/driver-license-repository'

interface UpdateCnhUseCaseDTO {
    data: Prisma.DriverLicenseUncheckedUpdateInput
    driverLicenseId: string
}

interface UpdateCnhUseCaseResponse {
    driverLicense: DriverLicense
}

export class UpdateDriverLicenseUseCase {
    constructor(private driverLicenseRepository: DriverLicenseRepository) {
        Object.freeze(this.driverLicenseRepository)
    }

    async execute({
        data,
        driverLicenseId,
    }: UpdateCnhUseCaseDTO): Promise<UpdateCnhUseCaseResponse> {
        const driverLicense = await this.driverLicenseRepository.update(
            data,
            driverLicenseId,
        )

        return { driverLicense }
    }
}
