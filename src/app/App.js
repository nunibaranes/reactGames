import React, { Component } from 'react';
import './App.css';

import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

class App extends Component {
  render() {
    const author= {
      name: 'Nofar Baranes',
      email: 'Nunibaranes@gmail.com',
      github: {
        name: 'nunibaranes',
        link: 'https://github.com/nunibaranes'
      }
    }

    return (
      <div className="App">
        <Header></Header>
        <Main></Main>
        <Footer data={author}></Footer>
      </div>
    );
  }
}

export default App;
