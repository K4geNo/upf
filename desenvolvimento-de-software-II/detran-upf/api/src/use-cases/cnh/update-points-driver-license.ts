import { DriverLicenseRepository } from '@/repositories/driver-license-repository'
import { InfractionsRepository } from '@/repositories/infractions-repository'

interface UpdatePointsDriverLicenseUseCaseRequestDTO {
    infractionId: string
    userId: string
}

export class UpdatePointsDriverLicenseUseCase {
    constructor(
        private driverLicenseRepository: DriverLicenseRepository,
        private infractionRepository: InfractionsRepository,
    ) {
        Object.freeze(this)
    }

    async execute({
        infractionId,
        userId,
    }: UpdatePointsDriverLicenseUseCaseRequestDTO) {
        const infraction =
            await this.infractionRepository.findById(infractionId)

        if (!infraction) {
            throw new Error('Infraction not found')
        }

        const driverLicense =
            await this.driverLicenseRepository.findByUserId(userId)

        if (!driverLicense) {
            throw new Error('Driver license not found')
        }

        if (driverLicense.points + infraction.points > 20) {
            throw new Error('Driver license suspended')
        }

        driverLicense.points += infraction.points

        await this.driverLicenseRepository.update(
            {
                points: driverLicense.points,
            },
            driverLicense.number,
        )
    }
}
