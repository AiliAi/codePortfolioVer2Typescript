import './button-up.scss';
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { animateScroll as scroll } from 'react-scroll';

const ButtonUp = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const scrollToTop = (): void => {
    scroll.scrollToTop();
  };

  /**
   * When scrolled down 900px, shows the button
   */
  const toggleVisible = (): void => {
    const scrolled: number = document.documentElement.scrollTop;
    if (scrolled > 900) {
      setVisible(true);
    } else if (scrolled <= 900) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div
      id="up-button"
      onClick={scrollToTop}
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <IoIosArrowUp />
    </div>
  );
};

export default ButtonUp;