import React, { useState } from 'react';

function ImageGallery({ selectedStyle }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="max-h-[800px] relative">
      {selectedStyle
        ? (
          <>
            <img className="w-full h-full object-contain" src={selectedStyle.photos[selectedImage].url} />
            <ul className="absolute left-8 top-8 flex flex-col gap-4">
              {selectedStyle.photos.map((photo, i) => (
              <li className="w-[96px] aspect-square overflow-hidden cursor-pointer" key={photo.thumbnail_url} onClick={() => setSelectedImage(i)}>
                <img src={photo.thumbnail_url} />
              </li>))}
            </ul>
            <button className="absolute text-6xl top-1/2 left-[160px] -translate-y-1/2" onClick={() => setSelectedImage(selectedImage === 0 ? selectedStyle.photos.length - 1 : selectedImage - 1)}>&lt;</button>
            <button className="absolute text-6xl right-8 top-1/2 -translate-y-1/2" onClick={() => setSelectedImage((selectedImage + 1) % selectedStyle.photos.length)}>&gt;</button>

          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
