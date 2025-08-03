import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop component that scrolls the window to the top
 * whenever the location (route) changes
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to the top of the page when location changes
    window.scrollTo(0, 0);
  }, [location]);

  // This component doesn't render anything
  return null;
}