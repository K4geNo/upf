import { VehicleRepository } from '@/repositories/vehicle-repository'
import { Vehicle } from '@prisma/client'

interface FindByLicensePlateUseCaseResponseDTO {
    vehicle: Vehicle
}

interface FindByLicensePlateUseCaseRequestDTO {
    licensePlate: string
}

export class FindByLicensePlateUseCase {
    constructor(private vehicleRepository: VehicleRepository) {
        Object.freeze(this.vehicleRepository)
    }

    async execute({
        licensePlate,
    }: FindByLicensePlateUseCaseRequestDTO): Promise<FindByLicensePlateUseCaseResponseDTO> {
        const vehicle =
            await this.vehicleRepository.getBylicensePlate(licensePlate)

        if (!vehicle) {
            throw new Error('Vehicle not found')
        }

        return { vehicle }
    }
}
