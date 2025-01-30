import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Divider, 
  Stack,
  Box 
} from '@mui/material';
import { 
  ArrowUpward, 
  ArrowDownward, 
  ChatBubbleOutline, 
  Share 
} from '@mui/icons-material';

// components/PostCard.js - Temporary simplified version
const PostCard = ({ post }) => {
  return (
    <Card sx={{ my: 2, p: 2 }}>
      <Typography variant="h5">{post?.title || 'No Title'}</Typography>
      <Typography>{post?.content || 'No Content'}</Typography>
      <Typography variant="caption">
        By {post?.author || 'Unknown'} • {post?.timestamp || ''}
      </Typography>
    </Card>
  );
};

/*const PostCard = ({ post, onUpvote, onDownvote }) => {
  console.log('Current post:', post);
  return (
    <Card sx={{ 
      mb: 2, 
      borderLeft: '4px solid #ff4500',
      '&:hover': { boxShadow: 2 } 
    }}>
      <CardContent sx={{ display: 'flex' }}>
        <Stack 
          direction="column" 
          alignItems="center" 
          spacing={1}
          sx={{ mr: 2, minWidth: 56 }}
        >
          <IconButton onClick={() => onUpvote(post.id)} color="inherit">
            <ArrowUpward />
          </IconButton>
          <Typography variant="subtitle1">
            {post.upvotes - post.downvotes}
          </Typography>
          <IconButton onClick={() => onDownvote(post.id)} color="inherit">
            <ArrowDownward />
          </IconButton>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Posted by {post.author} • {post.timestamp}
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom>{post.title}</Typography>
          <Typography variant="body1" component="p">{post.content}</Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            <IconButton size="small">
              <ChatBubbleOutline fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {post.comments} Comments
              </Typography>
            </IconButton>
            <IconButton size="small">
              <Share fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                Share
              </Typography>
            </IconButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
*/

export default PostCard;