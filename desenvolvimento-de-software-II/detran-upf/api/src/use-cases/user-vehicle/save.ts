import { UserVehicleRepository } from '@/repositories/user-vehicle'

interface AddVehicleToUserUseCaseRequestDTO {
    userId: string
    vehicleId: string
}

export class AddVehicleToUserUseCase {
    constructor(private userVehicleRepository: UserVehicleRepository) {
        Object.freeze(this)
    }

    async execute({
        userId,
        vehicleId,
    }: AddVehicleToUserUseCaseRequestDTO): Promise<void> {
        const vehicle = await this.userVehicleRepository.findUserVehicle(userId)

        if (vehicle) {
            throw new Error('User already has a vehicle')
        }

        await this.userVehicleRepository.save(userId, vehicleId)
    }
}
