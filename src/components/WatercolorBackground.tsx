
import React from "react";

interface WatercolorBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const WatercolorBackground: React.FC<WatercolorBackgroundProps> = ({ 
  children,
  className = "" 
}) => {
  return (
    <div className={`watercolor-bg min-h-screen w-full ${className}`}>
      {children}
    </div>
  );
};

export default WatercolorBackground;
