import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Title.scss';
class Title extends Component {
  props: any;
  static propTypes = {
      title: PropTypes.string.isRequired,
      additionalClass: PropTypes.string,
  };
  static defaultProps = {
    additionalClass: '',
  }

  /**
   * getClasses
   * return classes refer to arguments
   */
  getClasses = () => {
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
