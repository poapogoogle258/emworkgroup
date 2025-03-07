// import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
// import { memberExtension } from './prisma'
import { PrismaCustomClient } from './prisma'

export type Context = {
  prisma: PrismaCustomClient
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaCustomClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaCustomClient>()
  }
}

export const prismaMock = mockDeep<PrismaCustomClient>()