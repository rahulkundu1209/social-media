import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpward, ArrowDownward, ChatBubbleOutline, Share, BookmarkBorder } from '@mui/icons-material';

export default function PostCard({ post }) {
  const [votes, setVotes] = useState(post.votes);
  
  const handleVote = (value) => {
    setVotes(votes + value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
      <div className="flex gap-4">
        {/* Voting Section */}
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => handleVote(1)} className="text-gray-500 hover:text-green-500">
            <ArrowUpward />
          </button>
          <span className="font-medium">{votes}</span>
          <button onClick={() => handleVote(-1)} className="text-gray-500 hover:text-red-500">
            <ArrowDownward />
          </button>
        </div>

        {/* Post Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.username} 
              className="w-6 h-6 rounded-full"
            />
            <span>@{post.author.username}</span>
            <span>·</span>
            <span>{post.timestamp}</span>
          </div>

          <Link to={`/post/${post.id}`} className="text-lg font-medium mb-2 hover:underline">
            {post.title}
          </Link>

          <p className="text-gray-700 mb-4">{post.content}</p>

          {/* Post Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <ChatBubbleOutline />
              <span>{post.comments} Comments</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500">
              <Share />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-500">
              <BookmarkBorder />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const mockPosts = [
    {
        id: 1,
        title: "Just deployed my new MERN stack project!",
        content: "Really excited to share this new social media platform I've been working on...",
        author: { username: "devguy", avatar: "https://i.pravatar.cc/40" },
        votes: 42,
        comments: 15,
        timestamp: "2h ago"
    },
    // Add more mock posts...
];
