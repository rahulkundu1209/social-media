// Home.js (updated)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Add authorization headers to API calls
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const handleLike = async (postId) => {
    if (!user) return;
    try {
      const res = await authAxios.post(`http://localhost:5000/api/posts/like/${postId}`);
      setPosts(posts.map(post => post._id === postId ? res.data : post));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!user) return;
    try {
      const res = await authAxios.post(`http://localhost:5000/api/posts/comment/${postId}`, {
        text: commentText,
        user: user._id
      });
      setPosts(posts.map(post => post._id === postId ? res.data : post));
      setCommentInput("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="home">
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>By {post.user?.name}</p>
          <p>{post.content}</p>
          {/* ... existing media display code ... */}
          
          <div className="post-actions">
            <button 
              onClick={() => handleLike(post._id)}
              disabled={!user}
              title={!user ? "Login to like" : ""}
            >
              Like ({post.likes})
            </button>
          </div>

          <div className="comments-section">
            <h4>Comments ({post.comments.length})</h4>
            <ul>
              {post.comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.user?.name}:</strong> {comment.text}
                </li>
              ))}
            </ul>
            
            {user ? (
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button onClick={() => handleAddComment(post._id, commentInput)}>
                  Post Comment
                </button>
              </div>
            ) : (
              <p>Please login to comment</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;