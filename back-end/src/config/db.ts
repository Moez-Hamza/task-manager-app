const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  prisma.$use(async (params: any, next: any) => {
    const before = Date.now();
    try {
      const result = await next(params);
      const after = Date.now();
      console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    } catch (error) {
      const after = Date.now();
      console.error(`Query ${params.model}.${params.action} failed after ${after - before}ms:`, error);
      throw error;
    }
  });
}

export const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      await prisma.$connect();
      console.log('Database connected successfully!');
      return prisma;
    } catch (error) {
      console.error(`Error connecting to database (${retries} retries left):`, error);
      retries--;
      if (retries === 0) {
        console.error('All connection attempts failed, exiting.');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

export default prisma;
