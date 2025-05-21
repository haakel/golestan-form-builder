
import React, { useEffect, useState } from "react";

interface WatercolorBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const WatercolorBackground: React.FC<WatercolorBackgroundProps> = ({ 
  children,
  className = "" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`watercolor-bg min-h-screen w-full relative overflow-hidden ${className} ${isLoaded ? 'bg-loaded' : ''}`}>
      <div className="watercolor-overlay absolute inset-0 z-0"></div>
      <div className="watercolor-bubbles"></div>
      <div className="relative z-10 transition-opacity duration-1000 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default WatercolorBackground;
