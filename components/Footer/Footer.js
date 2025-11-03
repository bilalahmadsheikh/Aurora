import { CopyLeft } from "./CopyLeft";
import SiteIcon from "../Common/SiteIcon";
import Socials from "../Common/Socials";

export default function Footer({}) {
  return (
    <>
      <footer className='w-screen place-self-end bg-me-inverted border-t border-me-primary/20 relative overflow-hidden'>
        {/* Cyberpunk background effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-me-inverted via-me-inverted to-me-inverted opacity-90'></div>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        
        {/* Glowing top border */}
        <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-me-primary to-transparent shadow-[0_0_10px_theme(colors.emerald.400)]'></div>
        
        <div className='relative z-10 flex-row items-center space-y-6 py-8 md:flex md:space-y-0'>
          {/* Site Icon with glow effect */}
          <div className='flex justify-center md:mx-8 group'>
            <div className='p-3 rounded-lg border border-me-primary/30 bg-me-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-me-primary hover:bg-me-primary/10 hover:shadow-[0_0_20px_theme(colors.emerald.400/0.3)]'>
              <SiteIcon />
            </div>
          </div>
          
          {/* Copyright with enhanced styling */}
          <div className='flex-1 px-4'>
            <CopyLeft />
          </div>
          
          {/* Social links with cyberpunk styling */}
          <div className='px-4'>
            <div className='p-3 rounded-lg border border-me-secondary/30 bg-me-secondary/5 backdrop-blur-sm transition-all duration-300 hover:border-me-secondary hover:bg-me-secondary/10'>
              <Socials />
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-me-secondary via-me-primary to-me-secondary opacity-60'></div>
      </footer>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </>
  );
}