'use client';

import { useSession } from 'next-auth/react';
import { signOutUser } from '../services/authService';

export default function Header() {
  const { data: session } = useSession();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Task Manager App</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="ml-2 text-sm font-medium text-gray-700">
                {session?.user?.name}
              </span>
            </div>
            <div className="ml-4">
              <button
                onClick={() => signOutUser('/auth/login')}
                className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
