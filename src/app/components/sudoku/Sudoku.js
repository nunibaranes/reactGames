import React, { Component } from 'react';
import './Sudoku.scss';
import Title from '../common/title/Title.js';

class Sudoku extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        value: 'Sudoku Game'
    };
  }

  render() {
    const { value } = this.state;
    return (
      <section className="sudoku wrapper wrap-with-border">
        <Title value={value}></Title>
      </section>
    );
  }
}

export default Sudoku;
