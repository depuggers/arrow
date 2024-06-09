import React, { useState, useRef, useContext } from 'react';

import AppContext from '../context/AppContext';

function ImageThumbnails({ orientation }) {
  const [imageIndex, setImageIndex] = useState(0);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  const scrollThumbs = (e, direction) => {
    e.stopPropagation();
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), 3);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      behavior: 'smooth',
    });
    setImageIndex(nextIndex);
  };

  const selectedImageStyle = 'border-2 border-amber-500';
  const orientationContainerStyle = orientation === 'vertical' ? 'left-8 top-8 flex-col' : 'left-1/2 bottom-12 flex-row -translate-x-1/2';
  const orientationItemStyle = orientation === 'vertical' ? 'aspect-[1/3] grid-flow-row auto-rows-min' : 'h-[96px] aspect-[3/1] grid-flow-col';

  return (
    <div className={`absolute flex ${orientationContainerStyle}`}>
      <button className={`${imageIndex > 0 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>UP</button>
      <ul className={`overflow-hidden grid relative ${orientationItemStyle}`} ref={thumbnailContainerRef}>
        {styles[selectedStyle].photos.map((photo, i) => (
          <li
            className="w-[96px] p-2 aspect-square overflow-hidden cursor-pointer"
            key={photo.thumbnail_url}
            ref={(node) => {
              thumbnailsRef.current[i] = node;
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'setSelectedImage', payload: i });
            }}
          >
            <img className={`w-full h-full object-cover ${selectedImage === i ? selectedImageStyle : ''}`} src={photo.thumbnail_url} alt="" />
          </li>
        ))}
      </ul>
      <button className={`${imageIndex < 3 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, 1)}>DOWN</button>
    </div>
  );
}

export default ImageThumbnails;
