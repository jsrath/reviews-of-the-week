import React from 'react';
import logo from '../../assets/images/logo.svg';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <img alt="logo" src={logo} />
      <div className="logo-text">
        <p>
          Reviews <span className="logo-text-inner">of the</span> Week
        </p>
      </div>
    </div>
  );
};

export default Header;
