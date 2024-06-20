import React from 'react';

import Arrow from '../images/arrow.svg';

function ImageGalleryButton({
  flip, styles, cb, testid, ariaLabel,
}) {
  return (
    <button
      aria-label={ariaLabel}
      data-testid={testid}
      className={`absolute top-1/2 -translate-y-1/2 w-12 md:w-20 aspect-square opacity-65 clickable ${styles} ${flip && 'rotate-180'}`}
      onClick={(e) => {
        cb();
        e.stopPropagation();
      }}
    >
      <Arrow />
    </button>
  );
}

export default ImageGalleryButton;
