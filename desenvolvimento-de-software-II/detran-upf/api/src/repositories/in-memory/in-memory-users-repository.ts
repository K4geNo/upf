import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async create(data: User): Promise<User> {
        const user = {
            ...data,
            id: Math.random().toString(36).substring(7),
        }

        this.items.push(user)

        return user
    }

    async update(data: User, userId: string): Promise<User> {
        const userIndex = this.items.findIndex((user) => user.id === userId)

        if (userIndex >= 0) {
            this.items[userIndex] = data
        }

        return this.items[userIndex]
    }

    async findUserById(id: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id)

        if (!user) {
            return null
        }

        return user
    }

    async findUserByCpf(cpf: string): Promise<User | null> {
        const user = this.items.find((user) => user.cpf === cpf)

        if (!user) {
            return null
        }

        return user
    }
}
