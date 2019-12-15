import React, { Component } from 'react';

interface ICounterProps {
  title: string,
  counter: number,
  additionalClass?: string,
}

class Counter extends Component {
  props: ICounterProps;

  static defaultProps = {
    additionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = (): string => {
    const {additionalClass} = this.props;
    return `counter ${additionalClass}`; 
  }

  render() {
    const {title, counter} = this.props;

    return (
      <div className={this.getClasses()}>
        <span className='counter-title'>{title}</span>
        <span className='counter-number'>{counter}</span>
      </div>
    );
  }
}

export default Counter;
