import React, { useContext } from 'react';

import { FaCheck } from 'react-icons/fa';

import AppContext from '../context/AppContext';

import missing from '../images/missing.svg?url';

function StyleSelector() {
  const { store: { styles }, store: { selectedStyle }, dispatch } = useContext(AppContext);

  const loading = !styles;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {loading
          ? (
            <>
              <div className="w-1/4 h-5 skelly" />
              <div className="w-1/2 h-5 skelly" />
            </>
          )
          : (
            <>
              <span className="font-bold">STYLE  &gt;</span>
              <span className="uppercase">{styles[selectedStyle].name}</span>
            </>
          )}
      </div>
      <ul data-testid="style-selector" className="grid grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((v, i) => <div key={i}  className="w-full aspect-square rounded-full skelly" />)
          : styles.map((style, i) => (
            <li className="w-full aspect-square cursor-pointer relative" key={style.style_id} onClick={() => dispatch({ type: 'setSelectedStyle', payload: i })}>
              <img className={`h-full w-full object-cover rounded-full ${selectedStyle === i ? 'outline outline-offset-2 outline-primary' : ''}`} src={style.photos[0].thumbnail_url ?? missing} alt="" />
              {selectedStyle === i ? <FaCheck className="absolute right-0 top-0 bg-white rounded-full border-2 border-primary text-primary p-1" size={24} /> : null}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default StyleSelector;
