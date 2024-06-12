import React, { useState, useContext, useRef } from 'react';

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

  let { photos } = styles[selectedStyle];
  // photos = [...styles[selectedStyle].photos, ...styles[selectedStyle].photos, ...styles[selectedStyle].photos];

  return (
    <div className={`relative w-full h-full p-4 pb-[120px] overflow-hidden ${zoomed ? 'cursor-[url(../images/minus.png),auto] flex justify-center items-center' : 'cursor-[url(../images/plus.png),auto]'}`} onClick={() => setZoomed(!zoomed)} onPointerMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      <img
        className="w-full h-full max-w-none object-contain"
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
          <ImageThumbnails orientation="horizontal" textColor="white" />
          <ImageGalleryButton icon="&lt;" styles="left-8 text-white" cb={() => switchImage(-1)} />
          <ImageGalleryButton icon="&gt;" styles="right-8 text-white" cb={() => switchImage(1)} />
        </>
      ) : null}
    </div>
  );
}

export default ExpandedView;
