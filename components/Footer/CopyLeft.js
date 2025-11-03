import { useRouter } from "next/router";
import { getTranslation } from "../../lib/locales";
import { website } from "../../fluff.config";
import PrettyLink from "../Common/PrettyLink";

export function CopyLeft({}) {
  const router = useRouter();
  const tr = getTranslation(router);
  
  return (
    <div className='flex-col justify-center text-center space-y-3 md:mx-8'>
      {/* Author and year with cyberpunk styling */}
      <div className='text-center text-lg font-medium text-me-inverted'>
        <span className='text-gradient bg-gradient-to-r from-me-primary to-me-secondary bg-clip-text text-transparent'>
          {website.author}
        </span>
        <span className='mx-2 text-me-primary'>•</span>
        <span className='text-me-inverted/80'>{new Date().getFullYear()}</span>
      </div>
      
      {/* MIT link with enhanced styling */}
      <div className='group'>
        <PrettyLink 
           
          onBlackBg
          className='inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-me-primary/30 bg-me-primary/5 transition-all duration-300 hover:border-me-primary hover:bg-me-primary/10 hover:shadow-[0_0_15px_theme(colors.emerald.400/0.3)] hover:scale-105'
        >
          <span className='text-sm text-me-inverted/90 group-hover:text-me-primary transition-colors duration-300'>
            {tr.share_the_fluff}
          </span>
          <span className='text-xs bg-me-primary/20 text-me-primary px-2 py-1 rounded border border-me-primary/40'>
            
          </span>
        </PrettyLink>
      </div>
    </div>
  );
}