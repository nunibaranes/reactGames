import React, {useState} from 'react';

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
    <button className="btn" onClick={() => toggleClicked(false)}>{falseLabel}</button>
    : 
    <button className="btn" onClick={() => toggleClicked(true)}>{truthLabel}</button>;
}