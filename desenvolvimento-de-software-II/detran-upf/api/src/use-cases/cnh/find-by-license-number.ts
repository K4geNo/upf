import { DriverLicenseRepository } from '@/repositories/driver-license-repository'
import { DriverLicense } from '@prisma/client'

interface FindByNumberUseCaseResponse {
    driverLicense: DriverLicense
}

interface FindByLicenseNumberUseCaseRequest {
    licenseNumber: string
}

export class FindByLicenseNumberUseCase {
    constructor(private driverLicenseRepository: DriverLicenseRepository) {
        Object.freeze(this.driverLicenseRepository)
    }

    async execute({
        licenseNumber,
    }: FindByLicenseNumberUseCaseRequest): Promise<FindByNumberUseCaseResponse> {
        const driverLicense =
            await this.driverLicenseRepository.findByLicenseNumber(
                licenseNumber,
            )

        if (!driverLicense) {
            throw new Error('CNH not found')
        }

        return { driverLicense }
    }
}
