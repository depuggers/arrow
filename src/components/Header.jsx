import React, { useContext, useLayoutEffect, useState } from 'react';

import { PiShoppingCart } from 'react-icons/pi';
import { BsMoonStars, BsSun } from 'react-icons/bs';

import Logo from '../images/arrowlogo.svg';

import AppContext from '../context/AppContext';

function Header() {
  const [theme, setTheme] = useState(null);

  const { store: { cart } } = useContext(AppContext);

  if (!theme) {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <header className="flex justify-between items-center text-neutral-200 bg-neutral-800 px-6 py-2">
      <Logo className="translate-y-2 w-[min(50vw,256px)]" />
      <div className="flex gap-8 items-center">
        <button data-testid="theme-toggle" onClick={toggleTheme}>{theme === 'light' ? <BsMoonStars size={24} /> : <BsSun size={26} />}</button>
        <span className="flex gap-2 items-center">
          <PiShoppingCart size={32} />
          {cart.length > 0 ? `( ${cart.length} )` : null}
        </span>
      </div>
    </header>
  );
}

export default Header;
