import { VehicleRepository } from '@/repositories/vehicle-repository'
import { Vehicle } from '@prisma/client'

interface FindAllVehiclesUseCaseResponseDTO {
    vehicles: Vehicle[]
}

export class FindAllVehiclesUseCase {
    constructor(private vehicleRepository: VehicleRepository) {
        Object.freeze(this.vehicleRepository)
    }

    async execute(): Promise<FindAllVehiclesUseCaseResponseDTO> {
        const vehicles = await this.vehicleRepository.findAll()

        return { vehicles }
    }
}
