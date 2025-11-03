const fluffConfig = {
  website: {
    title: "Aurora",
    description: "Scientific research and publications platform",
    author: "Bilal Ahmad",
    defaultLocale: "en", // Set default to English
  },
  theme: "fluff", // Set fluff as default theme
  socials: [
    {
      icon: "linkedin", 
      href: "https://www.linkedin.com/company/gikisciencesociety",
    },
    {
      icon: "instagram",
      href: "https://www.instagram.com/gikisciencesociety?igsh=MThlYXhnbHY3bzZtMw==", 
    },
    {
      icon: "github",
      href: "https://github.com/bilalahmadsheikh",
    },
  ],
  pages: [
    // integrated in translations so be sure to add a tagline !
    ["home", "/"],
    ["projects", "/projects"], 
    ["blog", "/blog"],
    ["about", "/about"],
  ],
  // Disable language selector
  enableLanguageSelector: false,
  // Force single language
  locales: ["en"],
};

module.exports = fluffConfig;