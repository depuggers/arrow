import React, { useState, useContext, useRef } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import ImageGalleryButton from './ImageGalleryButton';
import ImageThumbnails from './ImageThumbnails';

import AppContext from '../context/AppContext';

import missing from '../images/missing.svg?url';

function ExpandedView({ switchImage }) {
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, hideModal,
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
      className={`relative w-full h-full overflow-hidden flex flex-col gap-2 items-center select-none ${zoomed ? 'cursor-[url(../images/minus.svg),auto] justify-center max-w-none max-h-none' : 'cursor-[url(../images/plus.svg),auto]'}`}
      onClick={() => setZoomed(!zoomed)}
      onPointerMove={(e) => {
        // console.log(e.clientX, e.clientY);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
    >
      <img
        data-testid="expanded-image"
        className={`${zoomed ? 'absolute max-w-none' : 'w-full h-full object-contain min-h-0'}`}
        src={photos[selectedImage].url ?? missing}
        style={zoomed ? {
          width: big.width,
          height: big.height,
          transform: `translateX(${(big.width - document.documentElement.clientWidth) * -position.left}px) translateY(${(big.height - document.documentElement.clientHeight) * -position.top}px)`,
        } : {}}
        ref={imgRef}
        alt=""
      />
      {!zoomed ? (
        <>
          <ImageThumbnails horizontal />
          {/* <ImageThumbnails orientation="horizontal" /> */}
          <ImageGalleryButton testid="expanded-left" ariaLabel="prev-image" flip styles="left-8" cb={() => switchImage(-1)}><FaArrowLeft /></ImageGalleryButton>
          <ImageGalleryButton testid="expanded-right" ariaLabel="next-image" styles="right-8" cb={() => switchImage(1)}><FaArrowRight /></ImageGalleryButton>
          <button className="absolute right-6 top-6 bg-white text-black opacity-80 rounded-full cursor-pointer" aria-label="close" onClick={hideModal}><IoClose size={32} /></button>
        </>
      ) : null}
    </div>
  );
}

export default ExpandedView;
