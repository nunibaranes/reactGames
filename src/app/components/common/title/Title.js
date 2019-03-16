import React, { Component } from 'react';

class Title extends Component {
  render() {
    return (
      <section className="title">
        <h1>{this.props.value}</h1>
      </section>
    );
  }
}

export default Title;
