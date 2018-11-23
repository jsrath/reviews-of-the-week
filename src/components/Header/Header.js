import React from 'react';
import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header = () => {
  return (
    <div class="Header">
      <img alt="logo" src={logo} />
      <div class="logo-text">
        <p>
          Reviews <span class="logo-text-inner">of the</span> Week
        </p>
      </div>
    </div>
  );
};

export default Header;
