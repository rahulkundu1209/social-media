// Home.js (updated)
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  const [commentInput, setCommentInput] = useState("");
  const [posts, setPosts] = useState([{
    title: "Morning Coffee Ritual",
    content: "Discovering the perfect pour-over technique - 5 tips for better coffee at home",
    file: "coffee.jpg",
    user: { name: "CoffeeLover", _id: "user1" },
    likes: 28,
    comments: [
      { 
        user: { name: "BaristaPro", _id: "user2" },
        text: "Great tips! Try grinding slightly coarser next time",
        _id: "comment1"
      }
    ],
    createdAt: "2023-07-25T08:30:00Z"
  },
  {
    title: "Night Sky Photography Guide",
    content: "Capturing the Milky Way: Camera settings and locations for best results",
    file: "stars.mp4",
    user: { name: "AstroShooter", _id: "user3" },
    likes: 142,
    comments: [],
    createdAt: "2023-07-24T20:15:00Z"
  },
  {
    title: "DIY Home Office Setup",
    content: "Transforming a small closet into a productive workspace - before/after shots",
    file: "office.jpg",
    user: { name: "HomeOfficeGuru", _id: "user4" },
    likes: 89,
    comments: [
      {
        user: { name: "RemoteWorker", _id: "user5" },
        text: "This is exactly what I needed!",
        _id: "comment2"
      }
    ],
    createdAt: "2023-07-23T14:00:00Z"
  }]);

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
          {post.file && (
						<div>
							{post.file.includes(".mp4") ? (
								<video width="320" height="240" controls>
									<source
										src={
									`http://localhost:5000/uploads/${post.file}`
										}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							) : (
								<img
									src={
									`http://localhost:5000/uploads/${post.file}`
									}
									alt="Post Media"
								/>
							)}
						</div>
					)}
          
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