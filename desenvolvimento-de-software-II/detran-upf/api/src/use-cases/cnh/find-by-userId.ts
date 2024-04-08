import { DriverLicenseRepository } from '@/repositories/driver-license-repository'
import { DriverLicense } from '@prisma/client'

interface FindLicenseByUserIdUseCaseResponse {
    driverLicense: DriverLicense
}

interface FindLicenseByUserIdUseCaseRequest {
    userId: string
}

export class FindLicenseByUserIdUseCase {
    constructor(private driverLicenseRepository: DriverLicenseRepository) {
        Object.freeze(this.driverLicenseRepository)
    }

    async execute({
        userId,
    }: FindLicenseByUserIdUseCaseRequest): Promise<FindLicenseByUserIdUseCaseResponse> {
        const driverLicense =
            await this.driverLicenseRepository.findByUserId(userId)

        if (!driverLicense) {
            throw new Error('CNH not found')
        }

        return { driverLicense }
    }
}
