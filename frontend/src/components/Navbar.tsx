import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Smart Leads</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name} ({user?.role})
        </span>
        <button
          onClick={() => setDark(!dark)}
          className="bg-white text-blue-600 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button
          onClick={logout}
          className="bg-white text-blue-600 px-4 py-1 rounded-lg text-sm hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;