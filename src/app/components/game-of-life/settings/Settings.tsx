
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Settings.scss';

import Title from '../../common/title/Title.js';
class Settings extends Component {
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
    getClasses = (): string => {
        const {additionalClass} = this.props;
        return `settings ${additionalClass}`; 
    }

    render() {
        const {title} = this.props;

        return (
            <div className={this.getClasses()}>
                <Title title={ title}/>
            </div>
        );
    }
}

export default Settings;
