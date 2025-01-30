// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { Home, Person, ExitToApp, AddBox } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16 items-center">
          {/* Left Section */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SocialApp
          </Link>

          {/* Center Navigation */}
          <div className="hidden sm:flex gap-8 items-center">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <Home fontSize="small" />
              <span>Home</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <Person fontSize="small" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to="/create-post"
                  className="flex items-center gap-1 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <AddBox fontSize="small" />
                  <span className="hidden sm:inline">New Post</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <ExitToApp fontSize="small" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <ExitToApp fontSize="small" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}