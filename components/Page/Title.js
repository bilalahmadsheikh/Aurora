function Title({ title, description }) {
  // Handle undefined or null title
  const safeTitle = title || "Untitled";
  
  // Create safe ID by replacing spaces and special characters
  const safeId = safeTitle
    .replace(/\s+/g, "-")      // Replace spaces with hyphens
    .replace(/[^\w-]/g, "")    // Remove special characters except hyphens
    .toLowerCase();

  return (
    <>
      <h3
        id={safeId}
        className='mt-8 px-4 font-lora text-4xl font-bold text-me-base'
      >
        {safeTitle}
      </h3>
      {/* Only render description if it exists */}
      {description && (
        <p className='mt-2 px-4 text-xl text-me-secondary'>{description}</p>
      )}
    </>
  );
}

export default Title;