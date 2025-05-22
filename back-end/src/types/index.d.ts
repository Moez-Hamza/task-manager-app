declare module '@prisma/client' {
  import { PrismaClient as PrismaClientOriginal } from '.prisma/client';
  export type PrismaClient = PrismaClientOriginal;
  export { Prisma } from '.prisma/client';
  const prisma: PrismaClient;
  export default prisma;
}
