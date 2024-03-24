import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async create(data: User) {
        const user = {
            ...data,
        }

        this.items.push(user)

        return user
    }

    async findAll(): Promise<User[]> {
        return this.items
    }

    async update(data: User, userId: string) {
        const userIndex = this.items.findIndex((user) => user.id === userId)

        if (userIndex >= 0) {
            this.items[userIndex] = data
        }

        return this.items[userIndex]
    }

    async findUserById(id: string) {
        const user = this.items.find((user) => user.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findUserByCpf(cpf: string) {
        const user = this.items.find((user) => user.cpf === cpf)

        if (!user) {
            return null
        }

        return user
    }
}
