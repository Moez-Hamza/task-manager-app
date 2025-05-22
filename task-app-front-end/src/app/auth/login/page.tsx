'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  
  const handleLoginSuccess = () => {
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Task Manager</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <LoginForm onSuccess={handleLoginSuccess} />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
