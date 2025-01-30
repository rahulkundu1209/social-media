// components/CommentCard.js (Updated Design)
import { Avatar, Button } from '@mui/material';

export default function CommentCard({ comment, depth = 0 }) {
  const maxDepth = 3;
  const canReply = depth < maxDepth;

  return (
    <div 
      className={`p-6 ${depth > 0 ? 'ml-8 border-l-2 border-gray-100' : ''}`}
    >
      <div className="flex gap-4">
        <Avatar 
          src={comment.author.avatar} 
          className={`!h-8 !w-8 ${depth > 0 ? '!h-6 !w-6' : ''}`}
        />

        <div className="flex-1">
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-800">
              @{comment.author.username}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{comment.timestamp}</span>
          </div>

          {/* Comment Content */}
          <p className="text-gray-700 text-sm mb-4">{comment.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-400">
              <button className="hover:text-green-500 p-1 rounded-full">
                <span className="material-icons text-sm">arrow_upward</span>
              </button>
              <span className="text-xs font-medium">{comment.votes}</span>
              <button className="hover:text-red-500 p-1 rounded-full">
                <span className="material-icons text-sm">arrow_downward</span>
              </button>
            </div>

            {canReply && (
              <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500">
                <span className="material-icons text-sm">reply</span>
                <span className="text-xs font-medium">Reply</span>
              </button>
            )}
          </div>

          {/* Replies */}
          {comment.replies?.map(reply => (
            <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}