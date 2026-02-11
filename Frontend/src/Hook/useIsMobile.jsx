import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

const getIsMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.innerWidth < MOBILE_BREAKPOINT;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  return isMobile;
}

export default useIsMobile;
