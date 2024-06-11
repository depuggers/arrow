import React from 'react';

function ImageGalleryButton({ children, styles, cb }) {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 text-6xl ${styles}`}
      onClick={(e) => {
        console.log('clicked')
        cb();
        e.stopPropagation();
      }}
    >
      {children}
    </button>
  );
}

export default ImageGalleryButton;
