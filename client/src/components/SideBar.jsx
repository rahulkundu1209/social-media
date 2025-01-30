// src/components/Sidebar.js
export default function Sidebar() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
      <div className="space-y-2">
        {['Technology', 'Programming', 'Web Development', 'MERN Stack'].map(topic => (
          <button 
            key={topic}
            className="text-gray-600 hover:text-blue-600 w-full text-left px-2 py-1 rounded hover:bg-gray-50"
          >
            #{topic}
          </button>
        ))}
      </div>
    </div>
  );
}