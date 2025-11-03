import { useRouter } from "next/router";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

import Page from "../../components/Page/Page";
import Title from "../../components/Page/Title";
import Button from "../../components/Common/Button";
import { getTranslation } from "../../lib/locales";
import { HiOutlineRefresh, HiCalendar, HiUser, HiClock, HiTag } from "react-icons/hi";

export default function Post({ post }) {
  const router = useRouter();
  const tr = getTranslation(router);
  
  if (router.isFallback || !post) {
    return (
      <Page>
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-8xl text-green-400 animate-spin'>
            <HiOutlineRefresh />
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="min-h-screen relative overflow-hidden">
        
        {/* Animated Background Grid */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full opacity-20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Hero Section with Clear Background */}
        <div className="relative py-16 px-6 border-b border-green-500/30">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-xs"></div>
          
          <div className="relative w-full mx-auto z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-green-400 font-mono tracking-wider drop-shadow-2xl relative">
                <span className="relative z-10">{post.title}</span>
                <div className="absolute inset-0 text-green-500 blur-sm -z-10 opacity-50">{post.title}</div>
              </h1>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-green-300 text-sm md:text-base">
                <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/50 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                  <HiUser className="text-green-400" />
                  <span className="font-mono">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/50 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                  <HiCalendar className="text-green-400" />
                  <span className="font-mono">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/50 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                  <HiClock className="text-green-400" />
                  <span className="font-mono">{post.readTime}</span>
                </div>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-2 bg-green-900/30 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full text-sm border border-green-500/40 hover:bg-green-800/40 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 font-mono cursor-pointer"
                    >
                      <HiTag className="text-xs text-green-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Article Content */}
        <div className="w-full py-12 relative z-10">
          <article className="w-full backdrop-blur-xs border border-green-500/40 rounded-none shadow-2xl shadow-green-500/10 overflow-hidden relative bg-black/30">
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 rounded-2xl blur-sm"></div>
            
            {/* Content Body with Enhanced Cyberpunk Styling */}
            <div className="relative p-8 md:p-12 backdrop-blur-xs bg-black/20">
              <div 
                className="
                  prose prose-invert prose-green max-w-none w-full

                  /* Headings */
                  prose-headings:text-green-400 prose-headings:font-mono prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:md:text-6xl prose-h1:leading-tight prose-h1:mb-8 prose-h1:pb-4 
                  prose-h1:border-b-2 prose-h1:border-green-500/60 prose-h1:font-bold
                  prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:leading-snug prose-h2:mt-12 prose-h2:mb-6 
                  prose-h2:pb-3 prose-h2:border-b prose-h2:border-green-400/40 prose-h2:text-green-300
                  prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:font-medium prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-green-300
                  prose-h4:text-xl prose-h4:md:text-2xl prose-h4:mb-3 prose-h4:text-green-300

                  /* Paragraphs */
                  prose-p:text-gray-200 prose-p:text-lg prose-p:md:text-xl prose-p:leading-relaxed prose-p:font-light prose-p:mb-6

                  /* Text styling */
                  prose-strong:text-green-300 prose-strong:font-bold prose-strong:bg-green-900/20 prose-strong:px-1 prose-strong:rounded
                  prose-em:text-green-200 prose-em:italic

                  /* Inline code */
                  prose-code:text-green-300 prose-code:bg-black/70 prose-code:px-2 prose-code:py-1 prose-code:rounded 
                  prose-code:border prose-code:border-green-600/60 prose-code:font-mono prose-code:text-sm

                  /* Code blocks */
                  prose-pre:bg-black/80 prose-pre:border-2 prose-pre:border-green-500/40 prose-pre:shadow-lg 
                  prose-pre:shadow-green-500/20 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6
                  prose-pre:overflow-hidden prose-pre:backdrop-blur

                  /* Blockquotes */
                  prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-black/40 
                  prose-blockquote:backdrop-blur prose-blockquote:text-gray-200 prose-blockquote:italic 
                  prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-md
                  prose-blockquote:shadow-md prose-blockquote:shadow-green-500/10

                  /* Lists */
                  prose-li:text-gray-200 prose-li:marker:text-green-400 prose-li:marker:font-bold 
                  prose-ul:space-y-2 prose-ol:space-y-2

                  /* Links */
                  prose-a:text-green-400 prose-a:underline-offset-4 prose-a:decoration-green-500/50
                  hover:prose-a:text-green-300 hover:prose-a:decoration-green-400
                  prose-a:font-medium prose-a:transition-all prose-a:duration-300

                  /* Tables */
                  prose-table:border-collapse prose-table:border prose-table:border-green-500/30
                  prose-th:bg-black/40 prose-th:text-green-300 prose-th:font-mono prose-th:border prose-th:border-green-500/30
                  prose-td:border prose-td:border-green-500/20 prose-td:text-gray-200

                  /* Divider */
                  prose-hr:border-green-500/50 prose-hr:my-10
                  "

                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </div>

            {/* Enhanced Article Footer */}
            <div className="border-t border-green-500/40 backdrop-blur-xs p-6 relative bg-black/10">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5"></div>
              
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-gray-300 font-mono">
                  Published in <span className="text-green-400 font-semibold bg-green-900/20 px-2 py-1 rounded">{post.category}</span>
                </div>
                <div className="flex gap-3">
                  <Button 
                    href='/blog'
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 
                               text-white px-6 py-3 rounded-lg font-mono transition-all duration-300 
                               border border-green-500/50 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/30
                               transform hover:scale-105 active:scale-95"
                  >
                    &larr; {tr?.post?.return_to_blog || "Back to Blog"}
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        /* Force all text elements to be light colored */
        :global(.prose *) {
          color: rgb(243, 244, 246) !important;
        }
        
        :global(.prose p, .prose div, .prose span, .prose text) {
          color: rgb(243, 244, 246) !important;
        }
        
        :global(.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6) {
          color: rgb(34, 197, 94) !important;
        }
        
        :global(.prose strong) {
          color: rgb(34, 197, 94) !important;
        }
        
        :global(.prose a) {
          color: rgb(34, 197, 94) !important;
        }
        
        :global(.prose code) {
          color: rgb(34, 197, 94) !important;
        }
        :global(.prose::-webkit-scrollbar) {
          width: 6px;
        }
        
        :global(.prose::-webkit-scrollbar-track) {
          background: rgba(55, 65, 81, 0.5);
        }
        
        :global(.prose::-webkit-scrollbar-thumb) {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 3px;
        }
        
        :global(.prose::-webkit-scrollbar-thumb:hover) {
          background: rgba(34, 197, 94, 0.7);
        }
        
        /* Custom selection */
        :global(.prose ::selection) {
          background: rgba(34, 197, 94, 0.2);
          color: rgb(34, 197, 94);
        }
        
        /* Enhance code blocks with terminal-like appearance */
        :global(.prose pre) {
          position: relative;
        }
        
        :global(.prose pre::before) {
          content: "● ● ●";
          position: absolute;
          top: 12px;
          left: 16px;
          color: rgba(34, 197, 94, 0.6);
          font-size: 12px;
          letter-spacing: 4px;
        }
        
        :global(.prose pre code) {
          margin-top: 20px;
          display: block;
        }
        
        /* List item enhancements */
        :global(.prose li::before) {
          content: "▶";
          color: rgb(34, 197, 94);
          font-weight: bold;
          position: absolute;
          left: -20px;
        }
        
        /* Heading glow effects */
        :global(.prose h1, .prose h2, .prose h3, .prose h4) {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }
        
        /* Link hover glow */
        :global(.prose a:hover) {
          text-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
        }
      `}</style>
    </Page>
  );
}

// getStaticProps and getStaticPaths remain the same...
export async function getStaticProps({ params }) {
  const { slug } = params;
  
  try {
    const blogDir = path.join(process.cwd(), "pages/blog");
    const fullPath = path.join(blogDir, `${slug}.md`);
    
    let source;
    try {
      source = await fs.readFile(fullPath, 'utf8');
    } catch {
      const mdxPath = path.join(blogDir, `${slug}.mdx`);
      source = await fs.readFile(mdxPath, 'utf8');
    }
    
    const { data, content } = matter(source);
    
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    
    const post = {
      slug,
      title: data.title || slug.replace(/-/g, " "),
      excerpt: data.excerpt || data.description || content.substring(0, 150).replace(/#+\s/g, '').trim() + "...",
      date: data.date || data.publishedAt || new Date().toISOString(),
      author: data.author || "Unknown Author",
      tags: data.tags || [],
      category: data.category || "Blog",
      readTime: data.readTime || "5 min read",
      contentHtml,
    };
    
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const blogDir = path.join(process.cwd(), "pages/blog");
    const filenames = await fs.readdir(blogDir);
    
    const blogFiles = filenames.filter((file) => {
      const isMarkdown = /\.(md|mdx)$/i.test(file);
      const isNotJS = !file.endsWith('.js');
      return isMarkdown && isNotJS;
    });
    
    const paths = blogFiles.map((file) => ({
      params: { 
        slug: file.replace(/\.(md|mdx)$/i, "") 
      },
    }));
    
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
}