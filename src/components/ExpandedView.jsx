import React, { useState, useContext } from 'react';

import ImageGalleryButton from './ImageGalleryButton';

import AppContext from '../context/AppContext';

function ExpandedView({ switchImage }) {
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage },
  } = useContext(AppContext);

  return (
    <div className={`relative w-full h-full p-4 ${zoomed ? 'cursor-vertical-text' : 'cursor-crosshair'}`} onClick={() => setZoomed(!zoomed)} onPointerMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      <img
        className="w-full h-full object-contain"
        src={styles[selectedStyle].photos[selectedImage].url}
        style={zoomed ? {
          // transform: `translateX(${-mousePos.x}px) translateY(${-mousePos.y}px) scale(250%)`,
          transform: `scale(250%) translateX(0%) translateY(0%) translateX(${-(mousePos.x - (document.documentElement.clientWidth / 2))}px) translateY(${-(mousePos.y - (document.documentElement.clientWidth / 2))}px)`,
        } : {}}
      />
      {!zoomed ? (
        <>
          <ImageGalleryButton icon="&lt;" styles="left-8 text-white" cb={() => switchImage(-1)} />
          <ImageGalleryButton icon="&gt;" styles="right-8 text-white" cb={() => switchImage(1)} />
        </>
      ) : null}
    </div>
  );
}

export default ExpandedView;
