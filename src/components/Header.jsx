import React, { useContext } from 'react';

import { PiShoppingCart } from 'react-icons/pi';

import Logo from '../images/atelierlogo.svg';

import AppContext from '../context/AppContext';

function Header() {
  const { store: { cart } } = useContext(AppContext);

  return (
    <header className="flex justify-between items-center text-neutral-200 bg-neutral-800 px-6 py-2">
      <Logo height={96} />
      <span className="flex gap-2 items-center">
        <PiShoppingCart size={32} />
        {cart.length > 0 ? `( ${cart.length} )` : null}
      </span>
    </header>
  );
}

export default Header;
