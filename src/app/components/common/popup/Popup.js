import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Popup.scss';

import Title from '../title/Title.js';

class Popup extends Component {
  static propTypes = {
    onClosePopup: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleAdditionalClass: PropTypes.string,
    additionalClass: PropTypes.string,
  };
  static defaultProps = {
    title: '',
    additionalClass: '',
    titleAdditionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = (additionalClass = '') => {
    return `popup ${additionalClass}`; 
  }

  render() {
    const {title,
      additionalClass,
      titleAdditionalClass, 
      onClosePopup, 
      children
    } = this.props;

    const hasTitle = title !== '';

    return (
      <div className={this.getClasses(additionalClass)}>
      <div className={'popup-content'}>
        <div className='close-popup' onClick={() => {onClosePopup()}}>X</div>
          {
            hasTitle && (
              <Title 
                title={title} 
                additionalClass={titleAdditionalClass}
              >
              </Title>
            )
          } 
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
