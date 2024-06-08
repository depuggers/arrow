import React, { useState, useContext, useRef } from 'react';

import ExpandedView from './ExpandedView';

import AppContext from '../context/AppContext';

import ImageGalleryButton from './ImageGalleryButton';

function ImageGallery() {
  const [imageIndex, setImageIndex] = useState(0);

  const thumbnailContainerRef = useRef(null);

  const thumbnails = {};
  const thumbnailsRef = useRef(thumbnails);

  const {
    showModal, store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const switchImage = (direction) => {
    dispatch({ type: 'switchImage', payload: direction });
  };

  const scrollThumbs = (e, direction) => {
    e.stopPropagation();
    const nextIndex = Math.min(Math.max(imageIndex + direction, 0), 3);
    thumbnailContainerRef.current.scrollTo({
      top: thumbnailsRef.current[nextIndex].offsetTop,
      behavior: 'smooth',
    });
    setImageIndex(nextIndex);
  };

  console.log(selectedImage, styles[selectedStyle].photos);
  console.log(styles[selectedStyle].photos[selectedImage].url);

  const selectedImageStyle = 'border-2 border-amber-500'

  return (
    <section id="image-gallery" className="h-[800px] relative pt-6">
      {styles
        ? (
          <>
            <img className="w-full h-full object-contain cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)} src={styles[selectedStyle].photos[selectedImage].url} alt="" />
            <div className="absolute left-8 top-8 flex flex-col">
              <button className={`${imageIndex > 0 ? 'visible' : 'invisible'}`} onClick={(e) => scrollThumbs(e, -1)}>UP</button>
              <ul className="overflow-hidden aspect-[1/3] grid grid-rows-[repeat(5,33%)] auto-rows-min relative" ref={thumbnailContainerRef}>
                {styles[selectedStyle].photos.map((photo, i) => (
                  <li
                    className={`w-[96px] p-2 aspect-square overflow-hidden cursor-pointer`}
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
            {selectedImage > 0 ? <ImageGalleryButton icon="&lt;" styles="text-black left-[160px]" cb={() => switchImage(-1)} /> : null}
            {selectedImage < styles[selectedStyle].photos.length - 1 ? <ImageGalleryButton icon="&gt;" styles="text-black right-8" cb={() => switchImage(1)} /> : null}
          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
