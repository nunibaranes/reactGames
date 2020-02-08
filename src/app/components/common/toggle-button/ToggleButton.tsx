import React, {useState} from 'react';
import { StyledButton } from '../../../styles/common/common.styles';

interface IToggleButtonProps {
    falseLabel: string,
    truthLabel: string,
    toggleButtonClicked?: (to: boolean) => void;
}

export default function ToggleButton(props: IToggleButtonProps) {
    const {falseLabel, truthLabel, toggleButtonClicked} = props;
    const [isClicked, setIsClicked] = useState(false);

    const toggleClicked = (to:boolean):void => {
        setIsClicked(to);
        toggleButtonClicked(to);
    }

    return isClicked 
    ? 
    <StyledButton isDarkMode={isClicked} onClick={() => toggleClicked(false)}>{falseLabel}</StyledButton>
    : 
    <StyledButton isDarkMode={isClicked} onClick={() => toggleClicked(true)}>{truthLabel}</StyledButton>;
}