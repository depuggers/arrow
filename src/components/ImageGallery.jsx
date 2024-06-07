import React, { useState } from 'react';

function ImageGallery({ selectedStyle }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="max-h-[800px]">
      {selectedStyle
        ? (
          <>
            <img id="main-image" src={selectedStyle.photos[selectedImage].url} />
            <ul id="thumbnail-list">
              {selectedStyle.photos.map((photo, i) => (
              <li key={photo.thumbnail_url} onClick={() => setSelectedImage(i)}>
                <img src={photo.thumbnail_url} />
              </li>))}
            </ul>
            <button id="prev-photo" onClick={() => setSelectedImage(selectedImage === 0 ? selectedStyle.photos.length - 1 : selectedImage - 1)}>&lt;</button>
            <button id="next-photo" onClick={() => setSelectedImage((selectedImage + 1) % selectedStyle.photos.length)}>&gt;</button>

          </>
        )
        : null}
    </section>
  );
}

export default ImageGallery;
