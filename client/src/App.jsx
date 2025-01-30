import React, { useState } from 'react';
import { CssBaseline, Container} from '@mui/material';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import { styled } from '@mui/material/styles';
import { Grid } from 'react-feather';

const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  paddingTop: theme.spacing(4),
}));
const dummyPost = {
  id: 123,
  title: "Just discovered this amazing CSS feature!",
  content: `After years of struggling with vertical centering, I finally learned about CSS Grid and Flexbox. Here's a quick comparison of different methods:
  
  1. Traditional margin auto
  2. Flexbox alignment
  3. CSS Grid placement
  4. Transform translate method
  
  Which one do you prefer? 🤔`,
  author: "css_wizard",
  upvotes: 245,
  downvotes: 12,
  comments: 38,
  timestamp: "2023-07-25T14:30:00Z",
  tags: ["webdev", "css", "frontend"],
  userProfilePic: "https://example.com/avatar1.jpg",
  media: "https://example.com/css-grid-example.png"
};

// Array of sample posts
const dummyPosts = [
  {
    id: 1,
    title: "React vs Vue: 2023 Edition",
    content: "Here's my updated comparison of the two frontend frameworks...",
    author: "framework_fan",
    upvotes: 892,
    downvotes: 45,
    comments: 156,
    timestamp: "2023-07-24T09:15:00Z",
    tags: ["react", "vue", "javascript"]
  },
  {
    id: 2,
    title: "Why is everyone talking about WebAssembly?",
    content: "I've been seeing a lot of WASM hype lately. Can someone explain...",
    author: "curious_dev",
    upvotes: 432,
    downvotes: 23,
    comments: 89,
    timestamp: "2023-07-25T10:00:00Z",
    media: "https://example.com/wasm-diagram.jpg"
  },
  {
    id: 3,
    title: "Just landed my first developer job! 🎉",
    content: "After 6 months of intense learning and 200+ applications...",
    author: "junior_dev",
    upvotes: 1567,
    downvotes: 8,
    comments: 234,
    timestamp: "2023-07-25T16:45:00Z",
    userProfilePic: "https://example.com/avatar2.jpg"
  }
];

function App() {
  const [posts, setPosts] = useState(dummyPosts);

  const handleUpvote = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, upvotes: post.upvotes + 1} : post
    ));
  };

  const handleDownvote = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, downvotes: post.downvotes + 1} : post
    ));
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <MainContainer maxWidth="lg" sx={{ backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={20}>
            <CreatePost />
            {posts.map(post => (
              <PostCard 
                key={post.id}
                post={post}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
              />
            ))}
          </Grid>
          <Grid item xs={3}>
            {/* Right sidebar content */}
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}

export default App;