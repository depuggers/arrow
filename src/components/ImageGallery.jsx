import React, { useContext } from 'react';

import ExpandedView from './ExpandedView';

import AppContext from '../context/AppContext';

import ImageGalleryButton from './ImageGalleryButton';

function ImageGallery() {
  // const [selectedImage, setSelectedImage] = useState(0);

  const {
    showModal, store: { styles }, store: { selectedStyle }, store: { selectedImage }, dispatch,
  } = useContext(AppContext);

  const switchImage = (direction) => {
    dispatch({ type: 'switchImage', payload: direction });
  };

  console.log(selectedImage, styles[selectedStyle].photos);
  console.log(styles[selectedStyle].photos[selectedImage].url);

  return (
    <section id="image-gallery" className="h-[800px] relative pt-6 cursor-zoom-in" onClick={() => showModal(<ExpandedView switchImage={switchImage} />)}>
      {styles
        ? (
          <>
            <img className="w-full h-full object-contain" src={styles[selectedStyle].photos[selectedImage].url} alt="" />
            <div className="overflow-y-scroll aspect-[1/5] absolute left-8 top-8">
              <ul className="flex flex-col gap-4 w-[96px]">
                {styles[selectedStyle].photos.map((photo, i) => (
                  <li
                    className="w-full aspect-square overflow-hidden cursor-pointer hover:-translate-y-[1px]"
                    key={photo.thumbnail_url}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'setSelectedImage', payload: i });
                    }}
                  >
                    <img className="w-full h-full object-cover" src={photo.thumbnail_url} alt="" />
                  </li>
                ))}
              </ul>
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
