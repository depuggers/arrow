import React from 'react';

function StyleSelector({ styles }) {
  return (
    <div id="style-selector">
      {styles.map((style) => <li>{style}</li>)}
    </div>
  );
}

export default StyleSelector;
