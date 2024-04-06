import { Vehicle } from '@prisma/client'
import { VehicleRepository } from '@/repositories/vehicle-repository'

interface RegisterUseCaseRequestDTO {
    anoFabricacao: number
    cor: string
    ipvaQuitado: boolean
    ipvaValor: number
    marca: string
    modelo: string
    placa: string
    tipo: number
}

interface RegisterUseCaseResponseDTO {
    vehicle: Vehicle
}

export class RegisterVehicleUseCase {
    constructor(private vehicleRepository: VehicleRepository) {
        Object.freeze(this.vehicleRepository)
    }

    async execute({
        anoFabricacao,
        cor,
        ipvaQuitado,
        ipvaValor,
        marca,
        modelo,
        placa,
        tipo,
    }: RegisterUseCaseRequestDTO): Promise<RegisterUseCaseResponseDTO> {
        const vehicleAlreadyExists =
            await this.vehicleRepository.getVehicleByPlaca(placa)

        if (vehicleAlreadyExists) {
            throw new Error('Vehicle already exists')
        }

        const vehicle = await this.vehicleRepository.create({
            ano_fabricacao: anoFabricacao,
            cor,
            ipva_quitado: ipvaQuitado,
            ipva_valor: ipvaValor,
            marca,
            modelo,
            placa,
            tipo,
        })

        return { vehicle }
    }
}
