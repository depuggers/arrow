import React, { useState } from 'react';

function ImageGallery({ selectedStyle }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="image-gallery" className="h-[800px] relative pt-6">
      {selectedStyle
        ? (
          <>
            <img className="w-full h-full object-contain" src={selectedStyle.photos[selectedImage].url} />
            <div className="overflow-y-scroll aspect-[1/5] absolute left-8 top-8">
              <ul className="flex flex-col gap-4 w-[96px]">
                {selectedStyle.photos.map((photo, i) => (
                  <li className="w-full aspect-square overflow-hidden cursor-pointer hover:-translate-y-[1px]" key={photo.thumbnail_url} onClick={() => setSelectedImage(i)}>
                    <img className="w-full h-full object-cover" src={photo.thumbnail_url} />
                  </li>
                ))}
              </ul>
            </div>
            <button className="absolute text-6xl top-1/2 left-[160px] -translate-y-1/2" onClick={() => setSelectedImage(selectedImage === 0 ? selectedStyle.photos.length - 1 : selectedImage - 1)}>&lt;</button>
            <button className="absolute text-6xl right-8 top-1/2 -translate-y-1/2" onClick={() => setSelectedImage((selectedImage + 1) % selectedStyle.photos.length)}>&gt;</button>

          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
