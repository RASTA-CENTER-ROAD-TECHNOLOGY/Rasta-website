import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Reads the viewport width at website open time and tracks breakpoint changes.
 */
export function useInitialScreenMode() {
  const [screenState, setScreenState] = useState(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
    return {
      initialWidth: width,
      currentWidth: width,
      isMobile: width < MOBILE_BREAKPOINT,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      const nextWidth = window.innerWidth;
      setScreenState((prev) => {
        const nextIsMobile = nextWidth < MOBILE_BREAKPOINT;
        if (prev.currentWidth === nextWidth && prev.isMobile === nextIsMobile) {
          return prev;
        }
        return {
          ...prev,
          currentWidth: nextWidth,
          isMobile: nextIsMobile,
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenState;
}
