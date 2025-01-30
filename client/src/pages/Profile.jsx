// pages/Profile.js (Updated Design)
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, Button, Divider } from '@mui/material';
import PostCard from '../components/PostCard';

const mockUser = {
  username: 'devguy',
  bio: 'Full-stack developer | Building cool stuff with MERN',
  followers: 1420,
  following: 234,
  posts: [
    {
      id: 1,
      title: "Just deployed my new MERN stack project!",
      content: "Really excited to share this new social media platform...",
      votes: 42,
      comments: 15,
      timestamp: "2h ago"
    },
  ]
};

export default function Profile() {
  const { username } = useParams();
  const { user } = useAuth();
  const isCurrentUser = user?.username === username;

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        <Avatar
          src={mockUser.avatar}
          className="!h-24 !w-24 !border-4 !border-white !absolute !-bottom-12 !left-6"
        />
      </div>

      {/* Profile Info */}
      <div className="px-6 pt-16">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">@{mockUser.username}</h1>
            <p className="text-gray-600 mt-2 text-sm">{mockUser.bio}</p>
          </div>
          <Button 
            variant="contained" 
            className={`!normal-case ${isCurrentUser ? '!bg-gray-100 !text-gray-800 hover:!bg-gray-200' : '!bg-blue-500 hover:!bg-blue-600'}`}
          >
            {isCurrentUser ? 'Edit Profile' : 'Follow'}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-6">
          <div className="text-center">
            <span className="block font-bold text-gray-800">{mockUser.followers}</span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-800">{mockUser.following}</span>
            <span className="text-sm text-gray-500">Following</span>
          </div>
        </div>

        <Divider className="!my-6" />

        {/* Posts */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {isCurrentUser ? 'Your Posts' : 'Recent Activity'}
        </h2>
        <div className="space-y-4">
          {mockUser.posts.map(post => (
            <PostCard key={post.id} post={{ ...post, author: mockUser }} />
          ))}
        </div>
      </div>
    </div>
  );
}