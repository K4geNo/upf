import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
    findUserById(id: string): Promise<User | null>
    findUserByCpf(cpf: string): Promise<User | null>
    create(data: Prisma.UserCreateInput): Promise<User>
    update(data: Prisma.UserUncheckedUpdateInput, userId: string): Promise<User>
}
