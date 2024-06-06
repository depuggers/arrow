import React from 'react';

function StyleSelector({ styles, selectedStyle, setSelectedStyleID }) {
  return (
    <div id="style-selector">
      <p>
        <span>STYLE &gt;</span>
        {selectedStyle.name}
      </p>
      <ul>
      {styles ? styles.map((style, i) => (
        <li key={style.style_id} onClick={() => setSelectedStyleID(style.style_id)}>
          <img src={style.photos[i].thumbnail_url} />
        </li>
      )) : null}
      </ul>
    </div>
  );
}

export default StyleSelector;
