import { RefObject, useEffect, useState } from "react";

export const useOnScreen = (ref: RefObject<Element>, rootMargin = "10px"): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const copyRef = ref;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: 1.0,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (copyRef.current) {
        observer.unobserve(copyRef.current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};
