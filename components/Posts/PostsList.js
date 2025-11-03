import PostItem from "./PostItem";

export default function PostsList({ posts, count }) {
  // Handle loading state
  if (!posts) {
    return (
      <div className='container mx-auto max-w-5xl py-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='my-8'>
            <div className="container flex-1 items-center space-x-4 rounded-2xl bg-gray-900 border border-green-500 p-8 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Handle empty state
  if (posts.length === 0) {
    return (
      <div className='container mx-auto max-w-5xl py-4'>
        <div className="text-center py-12">
          <div className="bg-gray-900 border border-green-500 rounded-2xl p-8 max-w-md mx-auto shadow-lg shadow-green-500/20">
            <div className="text-green-400 text-6xl mb-4 font-mono">404</div>
            <h3 className="text-xl text-green-400 font-mono mb-2">No Posts Found</h3>
            <p className="text-gray-400">
              No blog posts are available at the moment. Check back later for updates!
            </p>
            {/* Cyberpunk decoration */}
            <div className="mt-4 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  // Apply count limit if specified
  const displayPosts = count ? posts.slice(0, count) : posts;

  return (
    <div className='container mx-auto max-w-5xl py-4'>
      {displayPosts.map((post, index) => {
        return (
          <div key={post.slug || post.id || index} className='my-8'>
            <PostItem post={post} />
          </div>
        );
      })}
      
      {/* Show count indicator if limiting posts */}
      {count && posts.length > count && (
        <div className="text-center pt-4">
          <div className="bg-gray-900 border border-green-500 rounded-lg p-4 inline-block shadow-lg shadow-green-500/20">
            <p className="text-green-400 text-sm font-mono">
              <span className="text-green-300">Showing {count}</span> of <span className="text-green-300">{posts.length}</span> posts
            </p>
            <div className="mt-2 w-full h-px bg-gradient-to-r from-green-500 via-green-400 to-green-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}