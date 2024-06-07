import React from 'react';

function StyleSelector({ styles, selectedStyle, setSelectedStyleID }) {
  return (
    <div id="style-selector">
      <p>
        <span>STYLE &gt;</span>
        {selectedStyle.name}
      </p>
      <ul className="grid grid-cols-4">
      {styles ? styles.map((style, i) => (
        <li className="w-full aspect-square" key={style.style_id} onClick={() => setSelectedStyleID(style.style_id)}>
          <img className="object-cover" src={style.photos[i].thumbnail_url} />
        </li>
      )) : null}
      </ul>
    </div>
  );
}

export default StyleSelector;
