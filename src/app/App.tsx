import React, { Component } from 'react';
import './App.scss';

import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

class App extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      author: {
        name: 'Nofar Baranes',
        email: 'Nunibaranes@gmail.com',
        github: {
          name: 'nunibaranes',
          link: 'https://github.com/nunibaranes'
        }
      }
    };
  }

  render() {
    const { author }: any = this.state;
    return (
      <div className="app">
        <Header></Header>
        <Main></Main>
        <Footer data={author}></Footer>
      </div>
    );
  }
}

export default App;
