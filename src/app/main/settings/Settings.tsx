import React from 'react';
import styled from 'styled-components';

import ToggleButton from '../../components/common/toggle-button/ToggleButton';

interface ISettingsProps {
    toggleDarkModeClicked: (to: boolean) => void;
    darkModeTogglelabel: string
}

export default function Settings({toggleDarkModeClicked, darkModeTogglelabel}: ISettingsProps) {
    return (   
        <StyledSettings className="main-settings">
            <h4 className="title">Settings</h4>
            <ToggleButton toggleButtonClicked={toggleDarkModeClicked} label={darkModeTogglelabel}/>
        </StyledSettings>
    )
}

const StyledSettings = styled.div`
    width: 100%;
    max-width: 200px;
    height: auto;
    background-color: #909090;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    right: 10px;
    top: 10px; 
    padding: 10px;
    margin-top: -80px;
    transform: translateY(78px);

    .title {
        margin-bottom: 10px;
        margin-block-start: 0;
    }
    .btn {
        max-width: fit-content;
        margin-right: 0;
    }
`;