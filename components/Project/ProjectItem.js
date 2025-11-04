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
    "/research4.webp",
    "/research5.jpg",
    "/research6.jpeg"
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
      <div className="relative container flex h-60 w-56 flex-col rounded-2xl overflow-hidden shadow-xl shadow-me-light group">

        {/* Background Image */}
        <div className="rounded-2xl border-2 border-me-primary group-hover:border-me-accent overflow-hidden">
          <Image
            className="
              rounded-xl 
              object-cover 
              opacity-90 
              group-hover:opacity-70 
              group-hover:scale-105
              transition-all duration-600 ease-out
            "
            src={computedImg}
            width="224"
            height="256"
            layout="responsive"
            objectFit="cover"
            alt="research preview"
          />
        </div>

        {/* Light Fade Overlay */}
        <Link
          href={{ pathname: "/projects/[slug]", query: { slug: project.slug } }}
        >
          <a className="
            absolute inset-0 
            cursor-pointer 
            rounded-2xl 
            bg-gradient-to-b 
            from-black/10 via-black/20 to-black/60
            opacity-80
            group-hover:opacity-90
            transition-all duration-600
          "/>
        </Link>

        {/* Title */}
        <div className="absolute bottom-3 z-20 w-full text-center px-2">
          <Link
            href={{ pathname: "/projects/[slug]", query: { slug: project.slug } }}
          >
            <a>
              <h4 className="
                font-serif 
                font-extrabold 
                text-lg 
                text-white 
                drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]
                tracking-wide
                group-hover:text-green-300 
                group-hover:tracking-wider
                transition-all duration-400
              ">
                {project.matter.title ?? "Untitled Research"}
              </h4>
            </a>
          </Link>


        </div>
      </div>
    </>
  );

}