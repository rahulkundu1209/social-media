// src/pages/CreatePost.js
import { Button, TextField } from '@mui/material';

export default function CreatePost() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form className="space-y-4">
        <TextField
          fullWidth
          label="Post Title"
          variant="outlined"
          className="!mb-4"
        />
        <TextField
          fullWidth
          multiline
          rows={6}
          label="Post Content"
          variant="outlined"
          className="!mb-4"
        />
        <div className="flex justify-end">
          <Button 
            variant="contained" 
            className="!bg-blue-600 hover:!bg-blue-700 !text-white"
          >
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  );
}