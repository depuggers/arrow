import React, {
  useState, useRef, useContext, useEffect,
} from 'react';

import AppContext from '../context/AppContext';

function ImageThumbnails({ orientation, textColor }) {
  const [imageIndex, setImageIndex] = useState(0);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  useEffect(() => {
    const initialPosition = Math.min(selectedImage, 3);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[initialPosition].offsetTop,
      left: thumbnailsRef.current[initialPosition].offsetLeft,
      behavior: 'smooth',
    });
    setImageIndex(initialPosition);
  }, []);

  const scrollThumbs = (e, direction) => {
    e.stopPropagation();
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), 3);
    console.log(nextIndex, thumbnailContainerRef.current);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      left: thumbnailsRef.current[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
    setImageIndex(nextIndex);
  };

  const selectedImageStyle = 'border-2 border-amber-500';
  const orientationContainerStyle = orientation === 'vertical' ? 'left-8 top-8 flex-col' : 'left-1/2 bottom-4 flex-row -translate-x-1/2';
  const orientationItemStyle = orientation === 'vertical' ? 'aspect-[1/3] grid-flow-row auto-rows-min' : 'grid-cols-[repeat(3,1fr)] h-[96px] w-auto aspect-[3/1] grid-flow-col';

  return (
    <div className={`absolute flex ${orientationContainerStyle} text-${textColor}`}>
      <button className={`${imageIndex > 0 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>&lt;</button>
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
      <button className={`${imageIndex < 3 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, 1)}>&gt;</button>
    </div>
  );
}

export default ImageThumbnails;
