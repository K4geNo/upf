import { DriverLicense } from '@prisma/client'
import { DriverLicenseRepository } from '@/repositories/driver-license-repository'

interface RegisterDriverLicenseUseCaseRequestDTO {
    licenseNumber: string
    category: string
    points: number
    validity: Date
    userId: string
}

interface RegisterDriverLicenseUseCaseResponseDTO {
    driverLicense: DriverLicense
}

export class RegisterDriverLicenseUseCase {
    constructor(private driverLicenseRepository: DriverLicenseRepository) {
        Object.freeze(this.driverLicenseRepository)
    }

    async execute({
        category,
        licenseNumber,
        points,
        userId,
        validity,
    }: RegisterDriverLicenseUseCaseRequestDTO): Promise<RegisterDriverLicenseUseCaseResponseDTO> {
        const driverLicenseAlreadyExists =
            await this.driverLicenseRepository.findByLicenseNumber(
                licenseNumber,
            )

        if (driverLicenseAlreadyExists) {
            throw new Error('Driver License already exists.')
        }

        const driverLicense = await this.driverLicenseRepository.create({
            category,
            number: licenseNumber,
            points,
            validity,
            user: {
                connect: {
                    id: userId,
                },
            },
        })

        return { driverLicense }
    }
}
