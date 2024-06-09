import React, { useContext } from 'react';

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

  console.log(selectedImage, styles[selectedStyle].photos);
  console.log(styles[selectedStyle].photos[selectedImage].url);

  return (
    <section id="image-gallery" className="h-[800px] relative pt-6">
      {styles
        ? (
          <>
            <img className="w-full h-full object-contain cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)} src={styles[selectedStyle].photos[selectedImage].url} alt="" />
            <ImageThumbnails orientation="vertical" />
            {selectedImage > 0 ? <ImageGalleryButton icon="&lt;" styles="text-black left-[160px]" cb={() => switchImage(-1)} /> : null}
            {selectedImage < styles[selectedStyle].photos.length - 1 ? <ImageGalleryButton icon="&gt;" styles="text-black right-8" cb={() => switchImage(1)} /> : null}
          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
