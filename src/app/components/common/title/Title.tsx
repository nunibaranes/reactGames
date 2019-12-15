import React, { Component } from 'react';

import './Title.scss';
interface ITitleProps {
  title: string,
  additionalClass?: string,
}
class Title extends Component {
  props: ITitleProps;

  static defaultProps = {
    additionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = (): string => {
    const {additionalClass} = this.props;
    return `title ${additionalClass}`; 
  }

  render() {
    const {additionalClass} = this.props;

    return (
      <div className={this.getClasses()}>
        {
          additionalClass === 'main-title' ? 
            <h1>{this.props.title}</h1> : 
            <h3>{this.props.title}</h3>
        } 
      </div>
    );
  }
}

export default Title;
