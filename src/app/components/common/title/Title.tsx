import React from 'react';

import './Title.scss';
interface ITitleProps {
  title: string,
  additionalClass?: string,
}

function Title(props: ITitleProps) {
  const {
    additionalClass,
    title
  } = props;
  
  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (): string => `title ${additionalClass}`;

  return (
    <div className={getClasses()}>
    {
      additionalClass === 'main-title' ? 
          <h1>{title}</h1> : 
          <h3>{title}</h3>
      } 
    </div>
  );
  
}

Title.defaultProps = {
  additionalClass: '',
}

export default Title;
