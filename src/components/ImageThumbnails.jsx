import React, {
  useState, useRef, useContext, useEffect,
} from 'react';

import {
  PiCaretUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold,
} from 'react-icons/pi';
import AppContext from '../context/AppContext';

import missing from '../images/missing.png';

function ImageThumbnails({ orientation, textColor }) {
  const [imageIndex, setImageIndex] = useState(0);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  const { photos } = styles[selectedStyle];
  // const photos = styles[selectedStyle].photos.slice(0,3)
  // const photos = [...styles[selectedStyle].photos, ...styles[selectedStyle].photos, ...styles[selectedStyle].photos];
  const count = Math.min(photos.length, 7);
  // const count = 3;

  useEffect(() => {
    const initialPosition = Math.max(Math.min(selectedImage, photos.length - count), 0);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[initialPosition].offsetTop,
      left: thumbnailsRef.current[initialPosition].offsetLeft,
      behavior: 'smooth',
    });
    setImageIndex(initialPosition);
  }, [selectedImage]);

  const scrollThumbs = (e, direction) => {
    e.stopPropagation();
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), photos.length - count);
    console.log(nextIndex, thumbnailContainerRef.current);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      left: thumbnailsRef.current[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
    setImageIndex(nextIndex);
  };

  const selectedImageStyle = 'outline outline-offset-2 outline-primary';
  const orientationContainerStyle = orientation === 'vertical' ? 'left-8 top-8 flex-col' : 'left-1/2 bottom-4 flex-row -translate-x-1/2';

  return (
    <div className={`absolute flex ${orientationContainerStyle} text-${textColor}`}>
      <button className={`flex justify-center items-center ${imageIndex > 0 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>
        {orientation === 'vertical' ? <PiCaretUpBold size={24} /> : <PiCaretLeftBold size={24} />}
      </button>
      <ul
        className="overflow-hidden grid relative"
        ref={thumbnailContainerRef}
        style={orientation === 'vertical' ? {
          aspectRatio: `1 / ${count}`,
          gridAutoFlow: 'row',
          gridAutoRows: 'min-content',
        } : {
          aspectRatio: `${count} / 1`,
          gridTemplateColumns: `repeat(${count}, 1fr)`,
          height: '96px',
          width: 'auto',
          gridAutoFlow: 'column',
        }}
      >
        {photos.map((photo, i) => (
          <li
            className="w-[96px] p-2 aspect-square overflow-hidden cursor-pointer"
            key={i}
            ref={(node) => {
              thumbnailsRef.current[i] = node;
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'setSelectedImage', payload: i });
            }}
          >
            <img className={`w-full h-full object-cover ${selectedImage === i ? selectedImageStyle : ''}`} src={photo.thumbnail_url ?? missing} alt="" />
          </li>
        ))}
      </ul>
      <button className={`flex justify-center items-center ${imageIndex < photos.length - count ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, 1)}>
        {orientation === 'vertical' ? <PiCaretDownBold size={24} /> : <PiCaretRightBold size={24} />}
      </button>
    </div>
  );
}

export default ImageThumbnails;
