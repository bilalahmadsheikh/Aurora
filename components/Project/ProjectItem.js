import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getTranslation } from "../../lib/locales";

export default function ProjectItem({ project }) {
  const router = useRouter();
  const tr = getTranslation(router);
  
  // Array of your local images
  const localImages = [
    "/research1.png",
    "/research2.webp", 
    "/research3.webp",
    "/research4.webp"
  ];
  
  // Create a consistent random selection based on project slug
  const getRandomImage = (slug) => {
    // Simple hash function to get consistent randomness for the same slug
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      const char = slug.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Use absolute value and modulo to get index
    const index = Math.abs(hash) % localImages.length;
    return localImages[index];
  };
  
  const computedImg = getRandomImage(project.slug);
  
  return (
    <>
      <div
        className={
          "container flex h-60 w-56 flex-col rounded-2xl text-me-base shadow-xl shadow-me-light"
        }
      >
        <div className='rounded-2xl border-2 border-me-primary hover:border-me-accent'>
          <Image
            className='rounded-xl hover:scale-150'
            src={computedImg}
            width='224'
            height='256'
            layout='responsive'
            objectFit='fill'
            alt='random background image'
          ></Image>
        </div>
        <Link
          href={{
            pathname: "/projects/[slug]",
            query: { slug: project.slug },
          }}
        >
          <a className='absolute h-64 w-56 cursor-pointer rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-light)] opacity-30 hover:opacity-60'></a>
        </Link>

        <div className='text-shadow-base absolute flex h-28 w-56 translate-y-36 flex-col overflow-clip  rounded-b-xl bg-me-light font-bold text-me-inverted hover:text-me-primary'>
          <Link
            href={{
              pathname: "/projects/[slug]",
              query: { slug: project.slug },
            }}
          >
            <a>
              <h4 className='cursor-pointer py-1 text-center text-2xl'>
                {project.matter.title ?? "No Title"}
              </h4>
            </a>
          </Link>


        </div>
      </div>
    </>
  );
}