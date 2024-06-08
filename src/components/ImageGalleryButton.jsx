import React from 'react';

function ImageGalleryButton({ icon, styles, cb }) {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 text-6xl ${styles}`}
      onClick={(e) => {
        console.log('clicked')
        cb();
        e.stopPropagation();
      }}
    >
      {icon}
    </button>
  );
}

export default ImageGalleryButton;
