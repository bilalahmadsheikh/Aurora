import { useRouter } from "next/router";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";
import { useState } from "react";

import Page from "../../components/Page/Page";
import Title from "../../components/Page/Title";
import Button from "../../components/Common/Button";
import PostsList from "../../components/Posts/PostsList";
import { getTranslation } from "../../lib/locales";

export default function Blog({ posts }) {
  const [postList, setPostList] = useState(posts);
  const [displayCount, setDisplayCount] = useState(10); // Show 10 posts initially
  const router = useRouter();
  const tr = getTranslation(router);

  const loadMore = () => {
    setDisplayCount(prev => prev + 10); // Load 10 more posts
  };

  // Only show posts up to displayCount
  const visiblePosts = postList.slice(0, displayCount);
  const hasMore = displayCount < postList.length;

  return (
    <Page>
      <div className='container mx-auto max-w-screen-lg'>
        <div className='container'>
          <Title
            title={tr.taglines.blog.title}
            description={tr.taglines.blog.description}
          />
          
          {visiblePosts.length > 0 ? (
            <>
              <PostsList posts={visiblePosts} />
              
              {hasMore && (
                <span onClick={loadMore}>
                  <Button>&darr; {tr.post.load_more} &darr;</Button>
                </span>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No blog posts found. Create some .md or .mdx files in the pages/blog directory.</p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "pages/blog");
  let posts = [];
  
  try {
    const blogFilenames = await fs.readdir(blogDir);
    
    // Filter for markdown files only, exclude JS files
    const blogFiles = blogFilenames.filter((file) => {
      const isMarkdown = /\.(md|mdx)$/i.test(file);
      const isNotJS = !file.endsWith('.js');
      return isMarkdown && isNotJS;
    });
    
    if (blogFiles.length > 0) {
      posts = await Promise.all(
        blogFiles.map(async (file) => {
          try {
            const fullBlogPath = path.join(blogDir, file);
            const source = await fs.readFile(fullBlogPath, 'utf8');
            const { data, content } = matter(source);
            
            const post = {
              id: file.replace(/\.(md|mdx)$/i, ""),
              slug: file.replace(/\.(md|mdx)$/i, ""),
              title: data.title || file.replace(/\.(md|mdx)$/i, "").replace(/-/g, " "),
              body: data.excerpt || data.description || content.substring(0, 150).replace(/#+\s/g, '').trim() + "...",
              excerpt: data.excerpt || data.description || content.substring(0, 150).replace(/#+\s/g, '').trim() + "...",
              date: data.date || data.publishedAt || new Date().toISOString(),
              author: data.author || "Unknown Author",
              tags: data.tags || [],
              category: data.category || "Blog",
              readTime: data.readTime || "5 min read",
              // Image support with multiple fallback options
              image: data.image || data.featuredImage || data.banner || data.thumbnail || null,
              imageAlt: data.imageAlt || data.alt || data.title || "Article image",
              // Keep userId for compatibility with PostsList component if needed
              userId: 1,
            };
            
            return post;
            
          } catch (fileError) {
            console.error(`Error processing file ${file}:`, fileError);
            return null;
          }
        })
      );

      // Filter out null values and sort by date (newest first)
      posts = posts.filter(post => post !== null);
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
  } catch (error) {
    console.error("Error reading blog directory:", error);
    posts = [];
  }
  
  return {
    props: {
      posts,
    },
  };
}