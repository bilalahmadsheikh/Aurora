import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getTranslation } from "../../lib/locales";

const CyberpunkDNAViewer = dynamic(
  () => import("../CyberpunkDNAViewer"),
  { ssr: false }
);

export default function Hero() {
  const router = useRouter();
  const tr = getTranslation(router);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger fade-in after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          25% { background-position: 50% 100%; }
          50% { background-position: 100% 50%; }
          75% { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpTablet {
          0% {
            opacity: 0;
            transform: scale(1.1) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1.1) translateY(0);
          }
        }

        @keyframes fadeInUpDesktop {
          0% {
            opacity: 0;
            transform: scale(1.4) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1.4) translateY(0);
          }
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .hero-container {
            flex-direction: column;
            min-height: auto;
            padding: 1rem 0;
          }
          
          .text-content {
            width: 100%;
            text-align: center;
            padding: 0 1rem;
            margin-bottom: 2rem;
            z-index: 150;
          }
          
          .dna-container {
            width: 100%;
            height: 400px;
            transform: scale(0.8);
            margin: 0 auto;
            margin-top: -14rem;
            margin-bottom: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 5;
            animation: ${isVisible ? 'fadeInUp 1.2s ease-out forwards' : 'none'};
          }
          
          .hero-title {
            font-size: 2.5rem;
            line-height: 1.1;
            white-space: normal;
            word-break: break-word;
          }
          
          .hero-description {
            font-size: 1.125rem;
            line-height: 1.4;
            margin-top: 1rem;
          }
        }

        /* Tablet styles */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-container {
            flex-direction: row;
            align-items: flex-start;
            min-height: 500px;
            padding: 2rem 0;
          }
          
          .text-content {
            width: 50%;
            padding: 0 1rem;
            margin-top: -12rem;
            margin-left: 9rem;
            z-index: 150;
          }
          
          .dna-container {
            width: 45%;
            height: 600px;
            transform: scale(1.1);
            transform-origin: top right;
            margin-left: -12rem;
            margin-top: -4rem;
            z-index: 5;
            animation: ${isVisible ? 'fadeInUpTablet 1.2s ease-out forwards' : 'none'};
          }
          
          .hero-title {
            font-size: 4rem;
            line-height: 1;
            white-space: nowrap;
          }
          
          .hero-description {
            font-size: 1.5rem;
            line-height: 1.3;
            margin-top: 1rem;
          }
        }

        /* Desktop styles (keep original) */
        @media (min-width: 1024px) {
          .hero-container {
            flex-direction: row;
            align-items: flex-start;
            min-height: 350px;
          }
          
          .text-content {
            width: 70%;
            max-width: 24rem;
            padding: 0;
            margin-top: -14rem;
            z-index: 150;
          }
          
          .dna-container {
            width: calc(50% / 2.8 * 2);
            height: 900px;
            transform: scale(1.4);
            transform-origin: top right;
            margin-left: 8rem;
            margin-top: -12rem;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            z-index: 5;
            animation: ${isVisible ? 'fadeInUpDesktop 1.2s ease-out forwards' : 'none'};
          }
          
          .hero-title {
            font-size: 7rem;
            line-height: 1;
            white-space: nowrap;
          }
          
          .hero-description {
            font-size: 3rem;
            line-height: 1.2;
          }
        }

        /* Extra large desktop */
        @media (min-width: 1280px) {
          .text-content {
            max-width: 36rem;
            margin-top: -22rem;
          }
          
          .hero-title {
            font-size: 8rem;
          }
        }
      `}</style>
      
      <div className='hero-container relative text-me-base transition-all md:translate-y-4 xl:translate-y-6 flex items-center'>
        {/* Text content */}
        <div className='text-content flex items-start justify-center md:justify-start md:block font-lora'>
          <div className="text-center md:text-left" style={{ position: 'relative', zIndex: 160 }}>
            <h3 className='hero-title my-2 font-bold' 
                style={{ 
                  background: 'linear-gradient(45deg, #07ec26ff, #10c227ff, #0cad21ff, #0dad23ff, #0d8a1eff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '300% 300%',
                  animation: 'gradient 8s ease-in-out infinite',
                  position: 'relative',
                  zIndex: 200,
                  display: 'inline-block'
                }}>
              {tr.taglines.hero.title}
            </h3>
            <p className='hero-description my-2 text-me-accent opacity-60'>
              {tr.taglines.hero.description}
            </p>
          </div>
        </div>
        
        {/* 3D DNA Helix */}
        <div 
          className="dna-container flex justify-end items-start bg-gray-600/0 rounded-lg"
          style={{ 
            opacity: isVisible ? 1 : 0,
            pointerEvents: "auto",
            position: "relative",
            transition: "opacity 1.4s ease-out, transform 1.2s ease-out"
          }}
        >
          <CyberpunkDNAViewer />
        </div>
      </div>
    </>
  );
}