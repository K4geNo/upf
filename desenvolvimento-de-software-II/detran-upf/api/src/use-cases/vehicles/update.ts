import { VehicleRepository } from '@/repositories/vehicle-repository'
import { Prisma, Vehicle } from '@prisma/client'

interface UpdateVehicleUseCaseRequestDTO {
    data: Prisma.VehicleUncheckedUpdateInput
    vehicleId: string
}

interface UpdateVehicleUseCaseResponseDTO {
    vehicle: Vehicle
}

export class UpdateVehicleUseCase {
    constructor(private vehicleRepository: VehicleRepository) {
        Object.freeze(this.vehicleRepository)
    }

    async execute({
        data,
        vehicleId,
    }: UpdateVehicleUseCaseRequestDTO): Promise<UpdateVehicleUseCaseResponseDTO> {
        const updatedVehicle = await this.vehicleRepository.update(
            data,
            vehicleId,
        )

        return { vehicle: updatedVehicle }
    }
}
