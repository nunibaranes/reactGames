import React, { ReactNode } from 'react';
import './Popup.scss';

import Title from '../title/Title';

interface IPopupProps {
  onClosePopup: () => void,
  title?: string,
  titleAdditionalClass?: string,
  additionalClass?: string,
  children?: ReactNode 
};

function Popup(props: IPopupProps) {
  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (additionalClass = ''): string => {
    return `popup ${additionalClass}`; 
  }
  const {
    title,
    additionalClass,
    titleAdditionalClass, 
    onClosePopup, 
    children
  } = props;

  const hasTitle = title !== '';

  return (
    <div className={getClasses(additionalClass)}>
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

Popup.defaultProps = {
    title: '',
    additionalClass: '',
    titleAdditionalClass: ''
}

export default Popup;
