import React, { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ selectedImage, tags, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <img src={selectedImage} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};
