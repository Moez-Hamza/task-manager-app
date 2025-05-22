import { UserModel } from '../models/user.model';
import { generateToken } from '../utils/jwt.utils';


export class UserService {

  static async register(userData: { name: string; email: string; password: string }) {

    const existingUser = await UserModel.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    

    const user = await UserModel.create(userData);
    

    const token = generateToken(user.id, user.email);
    
   
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
  

  static async login(credentials: { email: string; password: string }) {

    const user = await UserModel.findByEmail(credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    

    const isPasswordValid = await UserModel.verifyPassword(
      credentials.password,
      user.password
    );
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    

    const token = generateToken(user.id, user.email);
    
 
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
  
 

}
