import './fade-in-section.scss';
import React, { useRef, useEffect, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = (pops) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!domRef.current) throw Error("domRef is not assigned");
      if (entries[0].isIntersecting) {
        setVisible(true);
        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });
    if (!domRef.current) throw Error("domRef is not assigned");
    observer.observe(domRef.current);
  }, []);

  return (
    <div
      className={`card fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {pops.children}
    </div>
  );
};

export default FadeInSection;