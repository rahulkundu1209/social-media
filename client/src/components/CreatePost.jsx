import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  return (
    <>
      <Button 
        variant="contained" 
        fullWidth 
        onClick={() => setOpen(true)}
        sx={{ mb: 2 }}
      >
        Create Post
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Post Title"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="normal"
            label="Post Content"
            multiline
            rows={4}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              // Handle post creation
              setOpen(false);
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreatePost;