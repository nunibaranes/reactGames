import React, { useState, useEffect} from 'react';
import Settings from './settings/Settings';
import WindowResize from '../common/window-resize/WindowResize';
import Board from './board/Board';

import './PaintBoard.scss';

export default function Paint() {
    const [activeColor, setActiveColor] = useState(null);

    const handleActivatedColor = (color) => {
        console.log('handleActivatedColor color ', color);
        setActiveColor(color);
    }
    return (
        <section className="paint-board wrap-with-border">
            <Settings onSetActiveColor={handleActivatedColor}/>
            {activeColor && (
                <Board
                color={activeColor}
                height='600px'
                width='980px'
                />
            )}
            <WindowResize/>
        </section>
    )
}
