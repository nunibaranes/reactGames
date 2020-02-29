import React, {useState} from 'react';

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
    <button className='btn'
        onClick={() => toggleClicked(!isClicked)}
    >
        {label}
    </button>);
}