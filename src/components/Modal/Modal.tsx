import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '../ModalContent/ModalContent';

const Modal = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} worksVideo={''} />,
          document.body
        )}
    </>
  );
};

export default Modal;