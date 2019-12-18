import React from 'react';

interface ICounterProps {
  title: string,
  counter: number,
  additionalClass?: string,
}
function Counter(props: ICounterProps) {
  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (): string => {
    const {additionalClass} = props;
    return `counter ${additionalClass}`; 
  }

  const {title, counter} = props;

  return (
    <div className={getClasses()}>
      <span className='counter-title'>{title}</span>
      <span className='counter-number'>{counter}</span>
    </div>
  );
};

Counter.defaultProps = {
  additionalClass: '',
}

export default Counter;