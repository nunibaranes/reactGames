import React, { ReactNode } from 'react';

import Title from '../title/Title';
import { StyledPopup, StyledClosePopup, StyledPopupContent } from './popup.styles';

interface IPopupProps {
  onClosePopup: () => void,
  title?: string,
  titleAdditionalClass?: string,
  additionalClass?: string,
  children?: ReactNode 
  isInnerPopup?: boolean,
};

export default function Popup(props: IPopupProps) {
  const {
    title = '',
    additionalClass = '',
    titleAdditionalClass = '', 
    onClosePopup, 
    children,
    isInnerPopup = false,
  } = props;

  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (additionalClass = ''): string => `popup ${additionalClass}`;
  
  const hasTitle = title !== '';

  return (
    <StyledPopup className={getClasses(additionalClass)} isInnerPopup={isInnerPopup}>
      <StyledPopupContent className={'popup-content'}>
        <StyledClosePopup className='close-popup' onClick={() => {onClosePopup()}}>X</StyledClosePopup>
        {
          hasTitle && (
            <Title 
              title={title} 
              additionalClass={titleAdditionalClass}
            />
          )
        } 
        {children}
      </StyledPopupContent>
    </StyledPopup>
  );
}