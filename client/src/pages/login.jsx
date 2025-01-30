// pages/Login.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button } from '@mui/material';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual authentication logic here
    login({ username: 'testuser', avatar: 'https://i.pravatar.cc/40' });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Login to SocialApp</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth
          className="bg-blue-500 hover:bg-blue-600"
        >
          Login
        </Button>
      </form>
    </div>
  );
}