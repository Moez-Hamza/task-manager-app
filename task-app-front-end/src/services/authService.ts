import axios from 'axios';
import { signOut } from 'next-auth/react';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData: RegisterData): Promise<void> => {
  try {
    await axios.post(`${API_URL}/users/register`, userData);
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (callbackUrl: string = '/auth/login'): Promise<void> => {
  try {
    await signOut({ callbackUrl });
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
