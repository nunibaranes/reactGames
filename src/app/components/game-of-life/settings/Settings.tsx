
import React from 'react';
import PropTypes from "prop-types";

import Title from '../../common/title/Title.js';

export default  function Settings(props: any) {
    const {title, additionalClass} = props;

    /**
     * getClasses
     * return classes refer to arguments
     */
    const getClasses = (): string => `settings ${additionalClass}`; 

    return (
        <div className={ getClasses() }>
            <Title title={ title }/>
        </div>
    );
}

Settings.propTypes = {
    title: PropTypes.string.isRequired,
    additionalClass: PropTypes.string,
};
Settings.defaultProps = {
  additionalClass: '',
}