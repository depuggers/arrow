import React, { useContext } from 'react';

import { FaCheck } from 'react-icons/fa';

import AppContext from '../context/AppContext';

import missing from '../images/missing.png';

function StyleSelector() {
  const { store: { styles }, store: { selectedStyle }, dispatch } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-4">
      <p className="flex gap-4">
        <span className="font-bold">STYLE  &gt;</span>
        <span className="uppercase">{styles[selectedStyle].name}</span>
      </p>
      <ul data-testid="style-selector" className="grid grid-cols-4 gap-4">
        {styles ? styles.map((style, i) => (
          <li className="w-full aspect-square cursor-pointer relative" key={style.style_id} onClick={() => dispatch({ type: 'setSelectedStyle', payload: i })}>
            <img className={`h-full w-full object-cover rounded-full ${selectedStyle === i ? 'outline outline-offset-2 outline-primary' : ''}`} src={style.photos[0].thumbnail_url ?? missing} alt="" />
            {selectedStyle === i ? <FaCheck className="absolute right-0 top-0 bg-white rounded-full border-2 border-primary text-primary p-1" size={24} /> : null}
          </li>
        )) : null}
      </ul>
    </div>
  );
}

export default StyleSelector;
