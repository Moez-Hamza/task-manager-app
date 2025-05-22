import axios from 'axios';
import { signOut } from 'next-auth/react';

const API_URL = 'http://localhost:5000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

/**
 * Login user with email and password
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Register a new user
 */
export const registerUser = async (userData: RegisterData): Promise<void> => {
  try {
    await axios.post(`${API_URL}/users/register`, userData);
  } catch (error) {
    throw error;
  }
};

/**
 * Sign out user
 * @param callbackUrl Optional URL to redirect to after sign out
 */
export const signOutUser = async (callbackUrl: string = '/auth/login'): Promise<void> => {
  try {
    await signOut({ callbackUrl });
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
