import { PrismaClient , Prisma } from '@prisma/client'

export const memberExtension = Prisma.defineExtension({
  name:"memberExtension",
  result: {
    member: {
      age: {
        needs: { birthday: true },
        compute(member) {
          return new Date().getFullYear() - new Date(member.birthday).getFullYear()
        },
      }
    },
  },
})

const prisma = new PrismaClient().$extends(memberExtension)

export type PrismaCustomClient = typeof prisma

export default prisma;