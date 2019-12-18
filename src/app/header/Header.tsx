import React, { Component } from 'react';
import * as noonles from '../../assets/images/nofarNoonles.jpg';
import './Header.scss';

function Header() {
  return (
      <header className="header" >
        <img src={noonles} className="noonles" alt="Nofar Baranes" />
        <h1>Hi, I'm Nofar Baranes</h1>
        <a
          className="link"
          href="#main"
          rel="noopener noreferrer"
        >
          Look what I have done
        </a>
      </header> 
  );
}

export default Header;
