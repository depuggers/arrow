import React, { useContext } from 'react';

import AppContext from '../context/AppContext';

function StyleSelector() {
  const { store: { styles }, store: { selectedStyle }, dispatch } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-4">
      <p className="flex gap-4">
        <span className="font-bold">STYLE  &gt;</span>
        <span className="uppercase">{styles[selectedStyle].name}</span>
      </p>
      <ul className="grid grid-cols-4 gap-4">
        {styles ? styles.map((style, i) => (
          <li className="w-full aspect-square rounded-full overflow-hidden cursor-pointer hover:-translate-y-[1px]" key={style.style_id} onClick={() => dispatch({ type: 'setSelectedStyle', payload: i })}>
            <img className="h-full w-full object-cover" src={style.photos[i].thumbnail_url} />
          </li>
        )) : null}
      </ul>
    </div>
  );
}

export default StyleSelector;
