import React, { Component, ReactNode } from 'react';
import PropTypes from "prop-types";
import './Popup.scss';

import Title from '../title/Title';

interface IPopupProps {
  onClosePopup: () => void,
  title?: string,
  titleAdditionalClass?: string,
  additionalClass?: string,
  children?: ReactNode 
};

class Popup extends Component {
  props: IPopupProps;

  static defaultProps = {
    title: '',
    additionalClass: '',
    titleAdditionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = (additionalClass = ''): string => {
    return `popup ${additionalClass}`; 
  }

  render() {
    const {
      title,
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
              />
            )
          } 
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
