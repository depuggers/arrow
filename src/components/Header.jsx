import React, { useContext } from 'react';

import Logo from '../images/atelierlogo.svg';

import AppContext from '../context/AppContext';

function Header() {
  const { store: { cart } } = useContext(AppContext);

  return (
    <header className="flex justify-between items-center text-white bg-neutral-800 px-6 py-2">
      <Logo height={96} />
      <span>
        Cart
        {cart.length > 0 ? `(${cart.length})` : null}
      </span>
    </header>
  );
}

export default Header;
