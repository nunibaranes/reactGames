import React, { Component } from 'react';
import PropTypes from "prop-types";
import Title from '../title/Title.js';

class Popup extends Component {
  static propTypes = {
      title: PropTypes.string.isRequired,
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
    return `popup ${additionalClass}`; 
  }

  render() {
    const {title} = this.props;

    return (
      <div className={this.getClasses()}>
      <div className='close-popup' onClick={() => {}}>X</div>
        <Title title={ title}></Title>
      </div>
    );
  }
}

export default Popup;
