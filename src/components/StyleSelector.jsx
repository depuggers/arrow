import React from 'react';

function StyleSelector({ styles, selectedStyleID, setSelectedStyleID }) {
  return (
    <div id="style-selector">
      {styles ? styles.map((style, i) => (
        <li key={style.style_id} onClick={() => setSelectedStyleID(style.style_id)}>
          <img src={style.photos[i].thumbnail_url} />
        </li>
      )) : null}
    </div>
  );
}

export default StyleSelector;
