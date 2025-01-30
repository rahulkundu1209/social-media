// pages/PostDetail.js (Updated Design)
import { useParams } from 'react-router-dom';
import { TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import CommentCard from '../components/CommentCard';

const mockPost = {
  id: 1,
  title: "Just deployed my new MERN stack project!",
  content: "Really excited to share this new social media platform...",
  author: { username: "devguy", avatar: "https://i.pravatar.cc/40" },
  votes: 42,
  comments: [
    {
      id: 1,
      content: "This looks amazing! Great work!",
      author: { username: "user1", avatar: "https://i.pravatar.cc/40" },
      votes: 12,
      timestamp: "1h ago",
      replies: [
        {
          id: 2,
          content: "Thanks! Appreciate it!",
          author: { username: "devguy", avatar: "https://i.pravatar.cc/40" },
          votes: 2,
          timestamp: "30m ago"
        }
      ]
    }
  ],
  timestamp: "2h ago"
};

export default function PostDetail() {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gray-50 p-6">
      {/* Main Post */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <PostCard post={mockPost} />
      </div>

      {/* Comment Form */}
      {user && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex gap-4">
            <Avatar src={user.avatar} className="!h-10 !w-10" />
            <form className="flex-1">
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add a comment..."
                variant="outlined"
                className="!mb-4"
                InputProps={{
                  className: '!rounded-xl !border-gray-200',
                }}
              />
              <div className="flex justify-end">
                <Button 
                  variant="contained" 
                  className="!rounded-full !px-6 !py-2 !bg-blue-500 hover:!bg-blue-600"
                >
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="space-y-4">
        {mockPost.comments.map(comment => (
          <div key={comment.id} className="bg-white rounded-xl shadow-sm">
            <CommentCard comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}