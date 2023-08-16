import './enter-right-section.scss';
import React, { useRef, useEffect, useState } from 'react';

interface EnterrightSectionProps {
  children: React.ReactNode;
}

function EnterrightSection(props: EnterrightSectionProps) {
  const [isVisibleright, setVisibleright] = useState(false);
  const domRefright = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!domRefright.current) throw Error("domRef is not assigned");

      if (entries[0].isIntersecting) {
        setVisibleright(true);
        // No need to keep observing:
        observer.unobserve(domRefright.current);
      }
    });

    if (domRefright.current) {
      observer.observe(domRefright.current);
    }

    return () => {
      if (domRefright.current) {
        observer.unobserve(domRefright.current);
      }
    };
  }, []);

  return (
    <div
      className={`enter-right-section ${
        isVisibleright ? 'is-visible-right' : ''
      }`}
      ref={domRefright}
    >
      {props.children}
    </div>
  );
}

export default EnterrightSection;
