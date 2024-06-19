import React, { useContext } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ImageThumbnails from './ImageThumbnails';
import ExpandedView from './ExpandedView';

import AppContext from '../context/AppContext';

import ImageGalleryButton from './ImageGalleryButton';

import missing from '../images/missing.svg?url';

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

  return (
    <section id="image-gallery" className="h-full w-full md:max-h-[80vh] flex flex-col md:flex-row items-center gap-2 relative pt-6 pl-6 pr-8 md:pr-0 select-none">
      {loading
        ? <div className="h-full aspect-[2/3] mx-auto skelly" />
        : (
          <div className="w-full h-full relative">
            <img data-testid="main-image" className="w-full h-full object-contain cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)} src={photos[selectedImage].url ?? missing} alt="" />
            {selectedImage > 0 ? <ImageGalleryButton testid="image-left" ariaLabel="prev-image" flip styles="left-4" cb={() => switchImage(-1)}><FaArrowLeft /></ImageGalleryButton> : null}
            {selectedImage < photos.length - 1 ? <ImageGalleryButton strokeWidth={20} testid="image-right" ariaLabel="next-image" styles="right-4" cb={() => switchImage(1)}><FaArrowRight /></ImageGalleryButton> : null}
          </div>

        )}
      <ImageThumbnails />
    </section>
  );
}

export default ImageGallery;
