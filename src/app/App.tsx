import React from 'react';

import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

import { StyledApp } from './styles/common/layout.styles';

type email = string;
type url = string;

interface IAuthor {
  name: string,
  email: email,
  github: {
    name: string,
    link: url
  }
}

export default function App() {
  const authorData: IAuthor = {
    name: 'Nofar Baranes',
    email: 'Nunibaranes@gmail.com',
    github: {
      name: 'nunibaranes',
      link: 'https://github.com/nunibaranes'
    }
  }

  return (
    <StyledApp className="app">
      <Header></Header>
      <Main></Main>
      <Footer data={authorData}></Footer>
    </StyledApp>
  );
}