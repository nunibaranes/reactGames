import React, { Component } from 'react';
import './App.scss';

import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';

type email = string;
type url = string;
interface IAuthor {
  name: string,
  email: email,
  github: {
    name: string,
    link: url
  }
};
interface IAppState {
  author: IAuthor,
}
class App extends Component {
  state: IAppState;

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
    const { author } = this.state;
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
