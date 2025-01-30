import PostCard, { mockPosts } from '../components/PostCard';

export default function Home() {
  return (
    <div className="w-3xl mx-auto py-6 px-4">
      {mockPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}