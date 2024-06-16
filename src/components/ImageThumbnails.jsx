import React, {
  useState, useContext, useRef, useLayoutEffect, useEffect,
} from 'react';

import {
  PiCaretUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold,
} from 'react-icons/pi';
import AppContext from '../context/AppContext';

import missing from '../images/missing.svg?url';

function ImageThumbnails({ horizontal }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [wide, setWide] = useState(false);

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  const {
    store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const loading = !styles;

  let photos = [];
  if (!loading) photos = styles[selectedStyle].photos;

  // const count = !wide ? 3 : loading ? 5 : Math.min(photos.length, 7);
  const count = 3;

  const handleBreakpoint = (e) => {
    // console.log(e.matches);
    setWide(e.matches);
  };

  useLayoutEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setWide(true);
    }

    window.matchMedia('(min-width: 768px)').addEventListener('change', handleBreakpoint);

    return () => window.matchMedia('(min-width: 768px)').removeEventListener('change', handleBreakpoint);
  }, []);

  // console.log(wide, count);

  useEffect(() => {
    const initialPosition = Math.max(Math.min(selectedImage, photos.length - count), 0);
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
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), photos.length - count);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      left: thumbnailsRef.current[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
    // console.log(nextIndex, thumbnailContainerRef.current, thumbnailsRef.current[nextIndex]);
    setImageIndex(nextIndex);
  };

  const selectedImageStyle = 'outline outline-offset-2 outline-primary';

  return (
    <div className={`flex items-center ${wide && !horizontal ? 'flex-col order-first' : !wide && !horizontal ? '' : 'text-[#d4d4d4]'}`}>
      <button data-testid="scroll-thumbnails-up" className={`flex justify-center items-center ${imageIndex > 0 && count < photos.length ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>
        {horizontal || !wide ? <PiCaretLeftBold size={32} /> : <PiCaretUpBold size={32} /> }
      </button>
      <ul
        data-testid="thumbnail-container"
        ref={thumbnailContainerRef}
        className="grid relative overflow-hidden"
        style={wide && !horizontal ? {
          width: '6rem',
          aspectRatio: `1 / ${count}`,
          gridTemplateRows: `repeat(${count}, 1fr)`,
          gridAutoFlow: 'row',
          // w-20 aspect-[1/3] grid-rows-[repeat(3,1fr)] grid-flow-row
        } : {
          height: '6rem',
          aspectRatio: `${count} / 1`,
          gridTemplateColumns: `repeat(${count}, 1fr)`,
          gridAutoFlow: 'column',
        }}
      >
        {loading ? Array.from({ length: count }).map((v, i) => <div key={i} className="w-full h-full p-1"><div className="w-full h-full skelly" /></div>) : photos.map((thumbnail, i) => (
          <li
            key={i}
            data-testid="thumbnail"
            ref={(node) => {
              thumbnailsRef.current[i] = node;
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'setSelectedImage', payload: i });
            }}
            className="w-full aspect-square p-1 cursor-pointer"
          >
            <img className={`w-full h-full object-cover ${selectedImage === i ? selectedImageStyle : ''}`} src={thumbnail.thumbnail_url ?? missing} alt="" />
          </li>
        ))}
      </ul>
      <button data-testid="scroll-thumbnails-down" className={`flex justify-center items-center ${imageIndex < photos.length - count ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, 1)}>
        {horizontal || !wide ? <PiCaretRightBold size={32} /> : <PiCaretDownBold size={32} /> }
      </button>
    </div>
  );
}

export default ImageThumbnails;
