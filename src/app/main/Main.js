import React, { Component } from 'react';
import './Main.scss';

// import ColorPicker from '../components/color-picker/ColorPicker';
import Sudoku from '../components/sudoku/Sudoku';
import ShareButtons from '../components/common/share-buttons/ShareButtons';

class Main extends Component {
  render() {
    return (
      <section className="main" id="main">
        <Sudoku></Sudoku>
        <ShareButtons></ShareButtons>
      </section>
    );
  }
}

export default Main;
