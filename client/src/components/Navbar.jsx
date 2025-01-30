import { Link } from 'react-router-dom';
import { Home, Person, ExitToApp } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">SocialApp</Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
            <Home fontSize="medium" />
            <span className="hidden md:inline">Home</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                <Person fontSize="medium" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button onClick={logout} className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
                <ExitToApp fontSize="medium" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
              <ExitToApp fontSize="medium" />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}