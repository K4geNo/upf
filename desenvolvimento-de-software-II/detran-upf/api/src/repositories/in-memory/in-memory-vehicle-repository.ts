import { Prisma, Vehicle } from '@prisma/client'

export class InMemoryVehicleRepository {
    public items: Vehicle[] = []

    async getVehicleById(id: string) {
        const vehicle = this.items.find((vehicle) => vehicle.id === id)

        if (!vehicle) {
            return null
        }

        return vehicle
    }

    async getVehicleByPlaca(placa: string) {
        const vehicle = this.items.find((vehicle) => vehicle.placa === placa)

        if (!vehicle) {
            return null
        }

        return vehicle
    }

    async getVehicles() {
        return this.items
    }

    async create(data: Prisma.VehicleCreateInput) {
        const vehicle = {
            ano_fabricacao: data.ano_fabricacao,
            cor: data.cor,
            createdAt: new Date(),
            id: Math.random().toString(),
            ipva_quitado: data.ipva_quitado,
            ipva_valor: data.ipva_valor,
            marca: data.marca,
            modelo: data.modelo,
            placa: data.placa,
            tipo: data.tipo,
        }

        this.items.push(vehicle)

        return vehicle
    }

    async update(data: Prisma.VehicleUncheckedCreateInput, vehicleId: string) {
        const vehicleIndex = this.items.findIndex(
            (vehicle) => vehicle.id === vehicleId,
        )

        if (vehicleIndex === -1) {
            return null
        }

        this.items[vehicleIndex] = {
            ano_fabricacao: data.ano_fabricacao,
            cor: data.cor,
            createdAt: new Date(),
            id: vehicleId,
            ipva_quitado: data.ipva_quitado,
            ipva_valor: data.ipva_valor,
            marca: data.marca,
            modelo: data.modelo,
            placa: data.placa,
            tipo: data.tipo,
        }

        return data
    }
}
