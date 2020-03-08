
import React from 'react';
import PropTypes from "prop-types";

import Title from '../../common/title/Title.js';
import { StyledSettings } from '../gameOfLife-styles.jsx';

export default  function Settings(props: any) {
    const {title, additionalClass} = props;

    /**
     * getClasses
     * return classes refer to arguments
     */
    const getClasses = (): string => `settings ${additionalClass}`; 

    return (
        <StyledSettings className={ getClasses() }>
            <Title title={ title }/>
        </StyledSettings>
    );
}

Settings.propTypes = {
    title: PropTypes.string.isRequired,
    additionalClass: PropTypes.string,
};
Settings.defaultProps = {
  additionalClass: '',
}