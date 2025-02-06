import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../App.css';

function Profile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || ''
  });

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      // Update user context with new data
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (!user) {
    return <div className="container">Please login to view your profile</div>;
  }

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar-section">
            <img
              src={profileData.profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="profile-avatar"
            />
            {/* {editMode && (
              //Input for profile picture
              
            )} */}
          </div>
          <div className="profile-details">
            {editMode ? (
              <form onSubmit={handleUpdateProfile}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="profile-input"
              />
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="profile-input"
                />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled
                />
                <div className="profile-actions">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2>{profileData.name}</h2>
                <p>{profileData.email}</p>
                <button
                  className="btn-edit"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="user-posts">
        <h3>Your Posts ({userPosts.length})</h3>
        <div className="posts-grid">
          {userPosts.map(post => (
            <div key={post._id} className="post-card">
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt="Post"
                  style={{ height: "100%", maxHeight: "400px" }}
                />
					)}
              <div className="post-content">
                <p>{post.content}</p>
                <div className="post-stats">
                  <span>Likes: {post.likes}</span>
                  <span>Comments: {post.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;