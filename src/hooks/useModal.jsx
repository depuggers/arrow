import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const useModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const dialogRef = useRef(null);

  const clearContent = () => {
    setModalContent(null);
  };

  const showModal = (content) => {
    if (dialogRef.current) {
      setModalContent(content);
      dialogRef.current.showModal();
      dialogRef.current.removeEventListener('close', clearContent);
      dialogRef.current.addEventListener('close', clearContent);
    }
  };

  const hideModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const modal = createPortal(
    <dialog ref={dialogRef}>
      {modalContent && modalContent}
    </dialog>,
    document.body,
  );

  return { modal, showModal, hideModal };
};

export default useModal;
