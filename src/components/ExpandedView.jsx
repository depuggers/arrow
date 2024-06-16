import React, { useState, useContext, useRef } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import ImageGalleryButton from './ImageGalleryButton';
import ImageThumbnails from './ImageThumbnails';

import AppContext from '../context/AppContext';

import missing from '../images/missing.png';

function ExpandedView({ switchImage }) {
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage },
  } = useContext(AppContext);

  const position = {
    left: ((mousePos.x - (document.documentElement.clientWidth / 2)) / document.documentElement.clientWidth),
    top: ((mousePos.y - (document.documentElement.clientHeight / 2)) / document.documentElement.clientHeight),
  };

  const big = {
    width: 0,
    height: 0,
  };

  if (imgRef.current) {
    big.width = imgRef.current.naturalWidth * 2.5;
    big.height = imgRef.current.naturalHeight * 2.5;
  }
  // console.log(big);

  const { photos } = styles[selectedStyle];
  // photos = [...styles[selectedStyle].photos, ...styles[selectedStyle].photos, ...styles[selectedStyle].photos];

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col gap-2 items-center select-none ${zoomed ? 'cursor-[url(../images/minus.png),auto] justify-center max-w-none max-h-none' : 'cursor-[url(../images/plus.png),auto]'}`}
      onClick={() => setZoomed(!zoomed)}
      onPointerMove={(e) => {
        // console.log(e.clientX, e.clientY);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
    >
      <img
        data-testid="expanded-image"
        className={`w-full h-full object-contain ${zoomed ? '' : 'min-h-0'}`}
        src={photos[selectedImage].url ?? missing}
        style={zoomed ? {
          width: big.width,
          height: big.height,
          objectFit: 'fill',
          transform: `translateX(${(big.width - document.documentElement.clientWidth) * -position.left}px) translateY(${(big.height - document.documentElement.clientHeight) * -position.top}px)`,
        } : {}}
        ref={imgRef}
        alt=""
      />
      {!zoomed ? (
        <>
          <ImageThumbnails horizontal />
          {/* <ImageThumbnails orientation="horizontal" /> */}
          <ImageGalleryButton testid="expanded-left" flip styles="left-8" cb={() => switchImage(-1)}><FaArrowLeft /></ImageGalleryButton>
          <ImageGalleryButton testid="expanded-right" styles="right-8" cb={() => switchImage(1)}><FaArrowRight /></ImageGalleryButton>
        </>
      ) : null}
    </div>
  );
}

export default ExpandedView;
