import React, { Component } from 'react';
import PropTypes from "prop-types";

class Counter extends Component {
  props: any;
  static propTypes = {
      title: PropTypes.string.isRequired,
      counter: PropTypes.number.isRequired,
      additionalClass: PropTypes.string,
  };
  static defaultProps = {
    additionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = () => {
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
