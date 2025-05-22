import prisma from '../config/db';
import bcrypt from 'bcrypt';


export class UserModel {

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }


  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }


  static async create(data: { name: string; email: string; password: string }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
