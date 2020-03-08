import React from 'react';

import { StyledTitle } from './title.styles';
import { Alignment } from '../../../interfaces/common/ui';
interface ITitleProps {
  title: string,
  additionalClass?: string,
  alignment?: Alignment,
  isMainTitle?: boolean,
}

export default function Title(props: ITitleProps) {
  const {
    additionalClass = '',
    title,
    alignment,
    isMainTitle = false,
  } = props;
  
  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (): string => `title ${additionalClass}`;

  return (
    <StyledTitle className={getClasses()} alignment={alignment} isMainTitle={isMainTitle}>
    {
      isMainTitle ? 
          <h1>{title}</h1> : 
          <h3>{title}</h3>
      } 
    </StyledTitle>
  );
  
}