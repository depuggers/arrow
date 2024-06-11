import React, { useContext } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ImageThumbnails from './ImageThumbnails';
import ExpandedView from './ExpandedView';

import AppContext from '../context/AppContext';

import ImageGalleryButton from './ImageGalleryButton';

function ImageGallery() {
  const {
    showModal, store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const switchImage = (direction) => {
    dispatch({ type: 'switchImage', payload: direction });
  };

  let { photos } = styles[selectedStyle];
  // photos = [...styles[selectedStyle].photos, ...styles[selectedStyle].photos, ...styles[selectedStyle].photos];

  return (
    <section id="image-gallery" className="h-[800px] w-full relative pt-6">
      {styles
        ? (
          <>
            <img className="w-full h-full object-contain cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)} src={photos[selectedImage].url} alt="" />
            <ImageThumbnails orientation="vertical" textColor="neutral-600" />
            {selectedImage > 0 ? <ImageGalleryButton styles="text-neutral-600 left-[160px]" cb={() => switchImage(-1)}><FaArrowLeft /></ImageGalleryButton> : null}
            {selectedImage < photos.length - 1 ? <ImageGalleryButton styles="text-neutral-600 right-8" cb={() => switchImage(1)}><FaArrowRight /></ImageGalleryButton> : null}
          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
