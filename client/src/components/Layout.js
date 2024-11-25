import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current page should have a dark background
  const isDarkBackground = location.pathname !== '/' && location.pathname !== '/movies';

  return (
    <div className="min-h-screen">
      <div className={isDarkBackground ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
