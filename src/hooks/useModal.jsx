import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const dialogRef = useRef(null);

  const showModal = (content) => {
    if (dialogRef.current) {
      setModalContent(content);
      dialogRef.current.showModal();
    }
  };

  const hideModal = () => {
    if (dialogRef.current) {
      setModalContent(null);
      dialogRef.current.close();
    }
  };

  const modal = createPortal(
    <dialog className="w-full max-w-full h-full max-h-full bg-transparent flex justify-center items-center" ref={dialogRef}>
      {modalContent && modalContent}
    </dialog>,
    document.body,
  );

  return { modal, showModal, hideModal };
};

export default useModal;
