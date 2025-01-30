// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;