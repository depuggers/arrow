import React from 'react';

function ImageGallery({ selectedStyle }) {
  return (
    <section id="image-gallery">
      <img id="main-image" src={selectedStyle ? selectedStyle.photos[0].url : ''} />
    </section>
  );
}

export default ImageGallery;
