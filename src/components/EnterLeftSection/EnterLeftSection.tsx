import './enter-left-section.scss';
import React, {useRef, useEffect, useState} from 'react';

interface EnterLeftSectionProps {
  children: React.ReactNode;
}

function EnterLeftSection(props: EnterLeftSectionProps) {
  const [isVisibleLeft, setVisibleLeft] = useState(false);
  const domRefLeft = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!domRefLeft.current) throw Error("domRef is not assigned");

      if (entries[0].isIntersecting) {
        setVisibleLeft(true);

        // No need to keep observing:
        observer.unobserve(domRefLeft.current);
      }
    });

    if (domRefLeft.current) {
      observer.observe(domRefLeft.current);
    }

    return () => {
      if (domRefLeft.current) {
        observer.unobserve(domRefLeft.current);
      }
    };
  }, []);

  return (
    <div
      className={`enter-left-section ${isVisibleLeft ? 'is-visible-left' : ''}`}
      ref={domRefLeft}
    >
      {props.children}
    </div>
  );
}

export default EnterLeftSection;
