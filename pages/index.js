// ============================================================================
// FULLY RESPONSIVE HOME PAGE (index.js) - Optimized for Mobile & Tablet
// ============================================================================

import { useRouter } from "next/router";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";

import Hero from "../components/Hero/Hero";
import ProjectList from "../components/Project/ProjectList";
import PostsList from "../components/Posts/PostsList";
import Page from "../components/Page/Page";
import Title from "../components/Page/Title";
import Button from "../components/Common/Button";
import { getTranslation } from "../lib/locales";

export default function Home({ projectList, posts }) {
  const router = useRouter();
  const tr = getTranslation(router);
  
  return (
    <Page>
      {/* Hero - Full Width */}
      <div className="w-full">
        <Hero />
      </div>
      
      {/* Content sections - Responsive padding and spacing */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Projects Section */}
          <section className="py-8 sm:py-12 md:py-16">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <Title title={tr?.taglines?.projects?.title || "Projects"} />
            </div>
            
            {/* Projects List - Responsive grid */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <ProjectList 
                projects={projectList} 
                count={4}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              />
            </div>
            
            {/* Projects Button - Responsive sizing */}
            <div className="flex justify-center sm:justify-start">
              <Button 
                href="/projects"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
              >
                {tr?.project?.all_projects || "All Projects"} &rarr;
              </Button>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="py-8 sm:py-12 md:py-16">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <Title title={tr?.post?.latest_posts || "Latest Posts"} />
            </div>
            
            {/* Posts List - Responsive layout */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <PostsList 
                posts={posts} 
                count={4}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
              />
            </div>
            
            {/* Blog Button - Responsive sizing */}
            <div className="flex justify-center sm:justify-start">
              <Button 
                href="/blog"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
              >
                {tr?.post?.all_blog || "All Blog Posts"} &rarr;
              </Button>
            </div>
          </section>
          
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  // Fetch Projects
  const projectsDir = path.join(process.cwd(), "pages/projects");
  let projectList = [];
  
  try {
    const projectFilenames = await fs.readdir(projectsDir);
    const projects = projectFilenames.filter((project) => /\.mdx?$/.test(project));
    projectList = await Promise.all(
      projects.map(async (project) => {
        const fullProjectPath = path.join(projectsDir, project);
        const source = await fs.readFile(fullProjectPath, 'utf8');
        const { data } = matter(source);
        return {
          path: project,
          slug: project.replace(/\.mdx?$/, ""),
          matter: data,
        };
      })
    );
  } catch (error) {
    console.error("Error loading projects:", error);
  }

  // Fetch Blog Posts
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
              excerpt: data.excerpt || data.description || content.substring(0, 150).replace(/#+\s/g, '').trim() + "...",
              date: data.date || data.publishedAt || new Date().toISOString(),
              author: data.author || "Unknown Author",
              tags: data.tags || [],
              category: data.category || "Blog",
              readTime: data.readTime || "5 min read",
              // Image support with multiple fallback options
              image: data.image || data.featuredImage || data.banner || data.thumbnail || null,
              imageAlt: data.imageAlt || data.alt || data.title || "Article image",
            };
            
            return post;
            
          } catch (fileError) {
            console.error(`Error processing file ${file}:`, fileError);
            return null;
          }
        })
      );

      // Filter out null values and sort by date
      posts = posts.filter(post => post !== null);
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
  } catch (error) {
    console.error("Error reading blog directory:", error);
    posts = [];
  }
  
  return {
    props: {
      projectList,
      posts,
    },
  };
}