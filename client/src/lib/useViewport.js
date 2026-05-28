import { useState, useEffect } from "react";

function useMinWidth(minWidth) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= minWidth;
  });
  useEffect(() => {
    const onResize = () => setMatches(window.innerWidth >= minWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [minWidth]);
  return matches;
}

export const useIsDesktop = (breakpoint = 900) => useMinWidth(breakpoint);
export const useIsUltrawide = (breakpoint = 1600) => useMinWidth(breakpoint);
