import { useState, useEffect } from "react";

export const useViewportWidth = (): [number, boolean] => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width < 600);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(width < 600);
  }, [width]);

  return [width, isMobile];
};
