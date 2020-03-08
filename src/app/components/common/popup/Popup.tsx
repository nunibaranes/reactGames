import React, { ReactNode } from 'react';

import Title from '../title/Title';
import { StyledPopup, StyledClosePopup, StyledPopupContent } from './popup.styles';
import { Alignment } from '../../../interfaces/common/ui';

interface IPopupProps {
  onClosePopup: () => void,
  title?: string,
  titleAdditionalClass?: string,
  titleAlignment?: Alignment,
  additionalClass?: string,
  children?: ReactNode 
  isInnerPopup?: boolean,
};

export default function Popup(props: IPopupProps) {
  const {
    title = '',
    additionalClass = '',
    titleAdditionalClass = '',
    titleAlignment, 
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
              alignment={titleAlignment}
            />
          )
        } 
        {children}
      </StyledPopupContent>
    </StyledPopup>
  );
}