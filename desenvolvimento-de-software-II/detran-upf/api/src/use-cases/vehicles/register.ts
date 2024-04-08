import { Vehicle } from '@prisma/client'
import { VehicleRepository } from '@/repositories/vehicle-repository'

interface RegisterUseCaseRequestDTO {
    manufacturingYear: number
    color: string
    ipvaPaid: boolean
    ipvaValue: number
    brand: string
    model: string
    licensePlate: string
    type: number
}

interface RegisterUseCaseResponseDTO {
    vehicle: Vehicle
}

export class RegisterVehicleUseCase {
    constructor(private vehicleRepository: VehicleRepository) {
        Object.freeze(this.vehicleRepository)
    }

    async execute({
        manufacturingYear,
        color,
        ipvaPaid,
        ipvaValue,
        brand,
        model,
        licensePlate,
        type,
    }: RegisterUseCaseRequestDTO): Promise<RegisterUseCaseResponseDTO> {
        const vehicleAlreadyExists =
            await this.vehicleRepository.getBylicensePlate(licensePlate)

        if (vehicleAlreadyExists) {
            throw new Error('Vehicle already exists')
        }

        const vehicle = await this.vehicleRepository.create({
            manufacturingYear,
            color,
            ipvaPaid,
            ipvaValue,
            brand,
            model,
            licensePlate,
            type,
        })

        return { vehicle }
    }
}
