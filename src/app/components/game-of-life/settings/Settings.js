
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Title from '../../common/title/Title.js';
class Settings extends Component {
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
     * @param {String} elName
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = () => {
        const {additionalClass} = this.props;
        return `settings ${additionalClass}`; 
    }

    render() {
        const {title} = this.props;

        return (
            <div className={this.getClasses()}>
                <Title title={ title}></Title>
            </div>
        );
    }
}

export default Settings;
