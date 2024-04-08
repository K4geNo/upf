import { DriverLicense } from '@prisma/client'
import { DriverLicenseRepository } from '@/repositories/driver-license-repository'

interface FindAllResponseDTO {
    cnhs: DriverLicense[]
}

export class FindAllDriverLicenseUseCase {
    constructor(private driverLicenseRepository: DriverLicenseRepository) {
        Object.freeze(this.driverLicenseRepository)
    }

    async execute(): Promise<FindAllResponseDTO> {
        const cnhs = await this.driverLicenseRepository.findAll()

        return { cnhs }
    }
}
