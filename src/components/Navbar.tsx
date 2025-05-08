import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-3 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 64 64" 
            className="w-10 h-10"
          >
            {/* Basketball */}
            <circle cx="32" cy="32" r="30" fill="#ff7f00" />
            <path 
              d="M32 2C15.4 2 2 15.4 2 32s13.4 30 30 30 30-13.4 30-30S48.6 2 32 2zm0 8c5.3 0 10.2 1.7 14.2 4.6l-9.6 9.6c-1.4-1-3-1.8-4.6-2.4V11c0-.3 0-.7 0-1zM11 32c0-5.3 1.7-10.2 4.6-14.2l9.6 9.6c-1 1.4-1.8 3-2.4 4.6H11c-.3 0-.7 0-1 0zm9.8 14.2C17.7 42.2 16 37.3 16 32h10.8c.6 1.6 1.4 3.2 2.4 4.6l-9.4 9.6zm25.4 0l-9.6-9.6c1.4-1 3-1.8 4.6-2.4V45c0 .3 0 .7 0 1 5.3 0 10.2-1.7 14.2-4.6l-9.2-9.2zm-9.6-9.6c-1.5-1.5-2.7-3.2-3.6-5.1-1-1.9-1.6-4-1.8-6.2h20.6c-.2 2.1-.8 4.2-1.8 6.1-.9 1.9-2.2 3.6-3.8 5.2l-9.6-9.6v9.6zm-5.4-11.3c.2-2.1.8-4.2 1.8-6.1.9-1.9 2.2-3.6 3.8-5.2l9.6 9.6c-1.5 1.5-2.7 3.2-3.6 5.1-1 1.9-1.6 4-1.8 6.2H31.2v-9.6z" 
              fill="#8b4513"
            />
            <path 
              d="M32 2v10c-1.6-.6-3.2-1.4-4.6-2.4l-9.6-9.6C21.8 3.7 26.7 2 32 2zM11 32c0-.3 0-.7 0-1h11.8c-.6 1.6-1.4 3.2-2.4 4.6l-9.6 9.6C7.7 42.2 6 37.3 6 32h5zm20 11c1.6.6 3.2 1.4 4.6 2.4l9.6 9.6C41.2 58 36.3 59.7 31 59.7v-10c.3 0 .7-.3 0-.7zm22-11c0 .3 0 .7 0 1H41.2c.6-1.6 1.4-3.2 2.4-4.6l9.6-9.6C56.3 21.8 58 26.7 58 32h-5z" 
              fill="#8b4513" 
              fillOpacity="0.3"
            />
          </svg>
          <span className="text-xl font-bold text-gray-800">NBA Filter</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
          >
            Équipes
          </Link>
          
          <div className="relative">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-orange-500"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 