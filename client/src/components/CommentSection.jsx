import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ArrowUp, ArrowDown } from 'react-feather';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/post/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/api/comments', {
        content: newComment,
        postId
      });
      
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4 pl-8 border-l-2 border-gray-100">
      {/* Add Comment Form */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Comment
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      {comments.map(comment => (
        <div key={comment._id} className="mb-4">
          <div className="flex items-center mb-1">
            <img
              src={comment.author.avatar || '/default-avatar.png'}
              className="w-6 h-6 rounded-full mr-2"
              alt="avatar"
            />
            <span className="text-sm font-medium">@{comment.author.username}</span>
            <span className="mx-2 text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-gray-800 text-sm ml-8">{comment.content}</p>
          
          {/* Comment Voting */}
          <div className="flex items-center mt-1 ml-8">
            <button className="hover:bg-gray-100 p-1 rounded">
              <ArrowUp size={14} className="text-gray-500" />
            </button>
            <span className="mx-1 text-xs font-medium">{comment.votes}</span>
            <button className="hover:bg-gray-100 p-1 rounded">
              <ArrowDown size={14} className="text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;