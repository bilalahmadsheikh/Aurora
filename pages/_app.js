import "../styles/globals.css";
import { FaAngleUp } from "react-icons/fa";
import ScrollToTop from "react-scroll-to-top";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D component to avoid SSR issues
const BloodCells3D = dynamic(() => import("../components/BloodCells3D"), {
  ssr: false,
  loading: () => null
});

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("fluff");

  useEffect(() => {
    setIsClient(true);
    
    // Initialize theme from localStorage or default to fluff
    const savedTheme = localStorage.getItem("theme") || "fluff";
    
    // Debug logging to see what's happening
    console.log("Host:", window.location.host);
    console.log("Saved theme from localStorage:", savedTheme);
    console.log("Current theme will be:", savedTheme);
    
    setCurrentTheme(savedTheme);
    
    // Remove all theme classes
    document.documentElement.classList.remove(
      "theme-fluff",
      "theme-dark",
      "theme-cyber",
      "theme-neon",
      "theme-lime",
      "theme-sky",
      "theme-pro"
    );
    
    // Add the saved theme class
    document.documentElement.classList.add(`theme-${savedTheme}`);
  }, []);

  // OPTION 1: Show blood cells for ALL themes (recommended for testing)
  const showBloodCells = isClient;

  // OPTION 2: If you want to keep theme-specific rendering, use this instead:
  // const showBloodCells = isClient && (
  //   currentTheme === "cyber" || 
  //   currentTheme === "neon" || 
  //   currentTheme === "dark" ||
  //   currentTheme === "fluff"  // Added fluff theme
  // );

  // OPTION 3: More robust theme checking with fallback
  // const showBloodCells = isClient && (
  //   ["cyber", "neon", "dark", "fluff"].includes(currentTheme)
  // );

  // Debug logging for blood cells rendering
  useEffect(() => {
    if (isClient) {
      console.log("Should show blood cells:", showBloodCells);
      console.log("Current theme for blood cells:", currentTheme);
    }
  }, [isClient, showBloodCells, currentTheme]);

  return (
    <>
      {/* 3D Blood Cells Background - Debug version shows for all themes */}
      {showBloodCells && (
        <BloodCells3D
          cellCount={2}
          speed={0.2}
          cellSize={35}
          worldHeight={8000}  // Adjust based on your page height
          worldWidth={2000}   // Adjust based on your page width
          className="opacity-70"
        />
      )}
      
      <Component {...pageProps} />
      
      <ScrollToTop
        smooth
        className='glass rounded-full p-0.5 text-4xl text-me-secondary hover:text-me-primary relative z-50'
        component={<FaAngleUp />}
      />
    </>
  );
}

export default MyApp;