import React, {useState} from 'react';
import { StyledButton } from '../../../styles/common/common.styles';

interface IToggleButtonProps {
    label: string;
    toggleButtonClicked: (to: boolean) => void;
}

export default function ToggleButton(props: IToggleButtonProps) {
    const {label, toggleButtonClicked} = props;
    const [isClicked, setIsClicked] = useState(false);

    const toggleClicked = (to:boolean):void => {
        setIsClicked(to);
        toggleButtonClicked(to);
    }

    return (
    <StyledButton className='btn'
        onClick={() => toggleClicked(!isClicked)}
    >
        {label}
    </StyledButton>);
}