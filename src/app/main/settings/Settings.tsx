import React from 'react';

import ToggleButton from '../../components/common/toggle-button/ToggleButton';
import { StyledSettings } from './settings.styles';

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