import React from 'react';
import { useState } from 'react';
import { Lock, User, AlertCircle, Package, Info } from 'lucide-react';

export default function LoginTab({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      
      if (username === 'admin' && password === 'admin') {
        onLogin();
      } else {
        setError('Invalid credentials. Only admin can sign in.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-center">
      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Package className="h-10 w-10 text-blue-800" />
            <span className="ml-2 text-2xl font-bold text-blue-800">FAST Warehouse</span>
          </div>
          <div className="hidden sm:block">
            <button className="text-gray-600 hover:text-blue-800 flex items-center">
              <Info className="h-5 w-5 mr-1" />
              <span>System Status: Online</span>
            </button>
          </div>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 border-t-4 border-blue-800">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-1">Warehouse Management</h2>
            <p className="text-gray-600">Admin login required</p>
          </div>
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-blue-800">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-white block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                  placeholder="Enter admin username"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-800">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-white block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                  placeholder="Enter admin password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© 2025 FAST Warehouse. All rights reserved. v4.2.1</p>
            <p className="mt-1">Secure Connection | GDPR Compliant</p>
          </div>
        </form>
      </div>
    </div>
  );
}