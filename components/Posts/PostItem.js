import Link from "next/link";
import Image from "next/image";
import Tag from "./../Common/Tag";
import { useRouter } from "next/router";
import { useState } from "react";
import { getTranslation } from "../../lib/locales";

export default function PostItem({ post, full }) {
  const router = useRouter();
  const tr = getTranslation(router);
  const [imageError, setImageError] = useState(false);

  if (!post) {
    return (
      <div className="container flex-1 items-center space-x-4 rounded-2xl bg-gray-900 border border-green-500 p-8 text-justify shadow-lg shadow-green-500/20 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // NEW: Component for handling image display with fallback using explicit dimensions
  const PostImage = ({ post, full, className }) => {
    const hasImage = post.image && !imageError;
    
    if (hasImage) {
      return (
        <div className={className}>
          <Image
            src={post.image}
            alt={post.imageAlt || post.title || "Article image"}
            width={full ? 448 : 288}
            height={full ? 320 : 192}
            className="rounded-xl transition-all duration-300 group-hover:scale-105 object-cover w-full h-full"
            onError={() => setImageError(true)}
            priority={false}
          />
          {/* Cyberpunk overlay for images */}
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent group-hover:animate-pulse rounded-xl z-10"></div>
        </div>
      );
    }
    
    // Fallback to existing cyberpunk placeholder
    return (
      <div className={className + ' bg-gradient-to-br from-green-600 to-green-800'}>
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent group-hover:animate-pulse rounded-xl"></div>
        {/* Cyberpunk grid overlay */}
        <div className="absolute inset-0 opacity-20 rounded-xl" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
    );
  };

  return (
    <>
      <div
        className={
          (full ? "mt-8 " : "md:flex ") +
          "container flex-1 items-center space-x-4 rounded-2xl bg-gray-900 border border-green-500 p-8 text-justify shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:border-green-400 transition-all duration-300 group"
        }
      >
        {/* Image Section */}
        {full ? (
          <PostImage 
            post={post}
            full={full}
            className="mx-auto h-48 w-72 shrink-0 cursor-pointer rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 md:h-[320px] md:w-11/12 overflow-hidden relative"
          />
        ) : (
          <Link href={"/blog/" + (post.slug || post.id)}>
            <a>
              <PostImage 
                post={post}
                full={full}
                className="mx-auto h-48 w-72 shrink-0 cursor-pointer rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 overflow-hidden group-hover:scale-105 relative"
              />
            </a>
          </Link>
        )}

        <div className='py-4 text-green-100'>
          <h4 className='py-4 text-2xl font-bold'>
            <Link href={"/blog/" + (post.slug || post.id)}>
              <a className='cursor-pointer font-lora hover:text-green-400 hover:underline transition-colors duration-200 text-green-300'>
                {!full &&
                  (post.title
                    ? post.title
                    : tr?.post?.no_title || "No Title")}
              </a>
            </Link>
          </h4>
          
          {/* Meta Information with Cyberpunk styling */}
          <p className='text-green-400 font-mono text-sm mb-2'>
            {post.date ? formatDate(post.date) : tr?.post?.no_date || "No Date"}
            {" - "}
            <span className="text-green-300">
              {post.author ? post.author : tr?.post?.no_author || "Unknown Author"}
            </span>
          </p>

          {/* Category Badge */}
          {post.category && (
            <div className="mb-3">
              <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-green-500">
                {post.category}
              </span>
            </div>
          )}

          {full ? (
            <div className='my-4 text-xl text-green-100'>
              {post.contentHtml ? (
                <div 
                  className="prose prose-invert prose-green max-w-none
                    prose-headings:text-green-400 prose-headings:font-mono
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-strong:text-green-300
                    prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-a:text-green-400 hover:prose-a:text-green-300"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              ) : (
                <p>{post.excerpt || post.body || tr?.post?.no_content || "No content available."}</p>
              )}
            </div>
          ) : (
            <span>
              <p className='line-clamp-3 my-4 text-xl text-gray-300 leading-relaxed'>
                {post.excerpt || post.body || tr?.post?.no_content || "No content available."}
              </p>
              <Link href={"/blog/" + (post.slug || post.id)}>
                <a className='cursor-pointer text-lg uppercase text-green-400 hover:text-green-300 transition-colors duration-200 font-mono tracking-wider border-b border-green-500 hover:border-green-300'>
                  {" "}
                  [{tr?.post?.read_full || "Read Full Article"}]
                </a>
              </Link>
            </span>
          )}

          {/* Tags with Cyberpunk styling */}
          <div className='mt-4 flex gap-2 flex-wrap'>
            {post.tags && post.tags.length > 0 ? (
              post.tags.slice(0, full ? post.tags.length : 3).map((tag, index) => (
                <Tag key={index} className="bg-gray-800 text-green-300 border border-green-500 hover:bg-green-900 transition-colors">
                  {tag}
                </Tag>
              ))
            ) : (
              <Tag className="bg-gray-800 text-green-300 border border-green-500">
                {tr?.post?.no_tag || "General"}
              </Tag>
            )}
            {!full && post.tags && post.tags.length > 3 && (
              <span className="text-gray-500 text-xs self-center font-mono">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Read time indicator */}
          {post.readTime && (
            <div className="mt-3 text-sm text-green-400 font-mono">
              📖 {post.readTime}
            </div>
          )}
        </div>
      </div>
    </>
  );
}