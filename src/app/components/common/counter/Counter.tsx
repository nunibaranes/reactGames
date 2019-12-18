import React from 'react';

interface ICounterProps {
  title: string,
  counter: number,
  additionalClass?: string,
}
export default function Counter(props: ICounterProps) {
  const {
    title,
    counter,
    additionalClass,
  } = props;

  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = (): string => `counter ${additionalClass}`;

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