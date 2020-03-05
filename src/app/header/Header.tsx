import React from 'react';
import noonles from '../../assets/images/nofarNoonles.jpg';

/** Styles */
import { StyledHeader } from '../styles/common/layout.styles';
import { StyledLink } from '../styles/common/common.styles';

export default function Header() {
  return (
      <StyledHeader className="header" >
        <img src={noonles} className="noonles" alt="Nofar Baranes" />
        <h1>Hi, I'm Nofar Baranes</h1>
        <StyledLink
          className="link"
          href="#main"
          rel="noopener noreferrer"
        >
          Look what I have done
        </StyledLink>
      </StyledHeader> 
  );
}
