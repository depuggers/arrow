import React, { useContext } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ImageThumbnails from './ImageThumbnails';
import ExpandedView from './ExpandedView';

import AppContext from '../context/AppContext';

import ImageGalleryButton from './ImageGalleryButton';

import missing from '../images/missing.png';

function ImageGallery() {
  const {
    showModal, store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const loading = !styles;

  let photos;
  if (!loading) {
    photos = styles[selectedStyle].photos;
  }

  const switchImage = (direction) => {
    dispatch({ type: 'switchImage', payload: direction });
  };

  // photos = [...styles[selectedStyle].photos, ...styles[selectedStyle].photos, ...styles[selectedStyle].photos];

  return (
    <section id="image-gallery" className="h-full max-h-[80vh] w-full relative pt-6 pl-6 pr-8 md:pr-0">
      {loading
        ? <div className="h-full aspect-[2/3] mx-auto skelly" />
        : (
          <>
            <img data-testid="main-image" className="w-full h-full max-h-full object-contain cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)} src={photos[selectedImage].url ?? missing} alt="" />
            {selectedImage > 0 ? <ImageGalleryButton testid="image-left" styles="text-base-content left-[160px]" cb={() => switchImage(-1)}><FaArrowLeft /></ImageGalleryButton> : null}
            {selectedImage < photos.length - 1 ? <ImageGalleryButton testid="image-right" styles="text-base-content right-8" cb={() => switchImage(1)}><FaArrowRight /></ImageGalleryButton> : null}
          </>
        )}
      <ImageThumbnails orientation="vertical" textColor="base-content" />
    </section>
  );
}

export default ImageGallery;
