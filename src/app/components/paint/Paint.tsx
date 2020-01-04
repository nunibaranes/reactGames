import React, { useState, useEffect} from 'react';
import Settings from './settings/Settings';
import WindowResize from '../common/window-resize/WindowResize';
// import Canvas from './canvas/Canvas';
import Canvas from './canvas/Canvas';

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
                <Canvas
                    color={activeColor}
                    height={600}
                    width={980}
                />
            )}
            <WindowResize/>
        </section>
    )
}
