import React, {
  useState, useRef, useContext, useEffect, useLayoutEffect,
} from 'react';

import {
  PiCaretUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold,
} from 'react-icons/pi';
import AppContext from '../context/AppContext';

import missing from '../images/missing.png';

function ImageThumbnails({ orientation, textColor }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [count, setCount] = useState(5);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const loading = !styles;

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  const photos = useRef([]);

  useEffect(() => {
    if (styles) {
      photos.current = styles[selectedStyle].photos;
    }
  }, [styles]);

  const responsiveCount = () => {
    if (document.documentElement.clientWidth < 768) {
      setCount(3);
    } else {
      setCount(Math.max(Math.min(photos.current.length, 7)), 1);
    }
  };

  useLayoutEffect(() => {
    responsiveCount();
    window.addEventListener('resize', responsiveCount);

    return () => window.removeEventListener('resize', responsiveCount);
  }, [photos.current]);

  useEffect(() => {
    const initialPosition = Math.max(Math.min(selectedImage, photos.current.length - count), 0);
    if (thumbnailContainerRef.current && thumbnailsRef.current[0]) {
      thumbnailContainerRef.current.scrollTo({
        top: thumbnailsRef.current[initialPosition].offsetTop,
        left: thumbnailsRef.current[initialPosition].offsetLeft,
        behavior: 'smooth',
      });
    }
    setImageIndex(initialPosition);
  }, [selectedImage]);

  const scrollThumbs = (e, direction) => {
    e.stopPropagation();
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), photos.current.length - count);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      left: thumbnailsRef.current[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
    console.log(thumbnailContainerRef.current, thumbnailsRef.current[nextIndex]);
    setImageIndex(nextIndex);
  };

  const selectedImageStyle = 'outline outline-offset-2 outline-primary';
  const orientationContainerStyle = orientation === 'vertical' ? 'left-8 top-2 flex-col text-base-content' : 'left-1/2 bottom-4 flex-row -translate-x-1/2 text-[#d4d4d4]';

  return (
    <div className={`absolute flex ${orientationContainerStyle}`}>
      <button className={`flex justify-center items-center ${imageIndex > 0 && count < photos.current.length ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>
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
        {loading
          ? Array.from({ length: count }).map((v, i) => <li key={i} className="w-[88px] m-2 aspect-square skelly" />)
          : photos.current.map((photo, i) => (
            <li
              className="w-[max(96px,6vw)] p-2 aspect-square overflow-hidden cursor-pointer"
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
      <button className={`flex justify-center items-center ${imageIndex < photos.current.length - count ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, 1)}>
        {orientation === 'vertical' ? <PiCaretDownBold size={24} /> : <PiCaretRightBold size={24} />}
      </button>
    </div>
  );
}

export default ImageThumbnails;
