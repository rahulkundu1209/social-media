// CreatePost.js (updated)
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function CreatePost() {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    file: null,
  });

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("file", newPost.file);
    formData.append("user", user._id);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setNewPost({ title: "", content: "", file: null });
      alert('Post created successfully!');
    } catch (error) {
      console.error("Error creating post:", error);
      alert('Error creating post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={newPost.content}
        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
      />
      <input 
        type="file" 
        name="file" 
        onChange={(e) => setNewPost({...newPost, file: e.target.files[0]})} 
      />
      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
}

export default CreatePost;