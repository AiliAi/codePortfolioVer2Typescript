import './modal-content.scss';
import { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface ModalContentProps {
  worksVideo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
}

const appId: HTMLCollection = document.getElementsByClassName('.App');

const ModalContent = ({ worksVideo, onClose }: ModalContentProps) => {
  const iframeUrl = worksVideo;
  const [iframSrc] = useState(iframeUrl);

  useEffect(() => {
    /**
     * Disable scrolll
     */
    disableBodyScroll(appId as unknown as HTMLElement);
  }, []);

  const handleClick = () => {
    enableBodyScroll(appId as unknown as HTMLElement);
    onClose();
  };

  return (
    <div className="video-modal">
      <iframe
        src={iframSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="iframe-scale"
      ></iframe>
      <span
        className="modal__button"
        style={{ display: 'none' }}
        onClick={handleClick}
      >
        Close
      </span>
    </div>
  );
};

export default ModalContent;
