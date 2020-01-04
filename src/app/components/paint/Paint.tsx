import React, { useState, useEffect} from 'react';
import Settings from './settings/Settings';
import WindowResize from '../common/window-resize/WindowResize';
// import Canvas from './canvas/Canvas';
import Canvas from './canvas/Canvas';

import './PaintBoard.scss';

export default function Paint() {
    const [activeColor, setActiveColor] = useState(null);
    const [lineWidth, setLineWidth] = useState(0);

    const handleActivatedColor = (color) => {
        setActiveColor(color);
    }
    
    const handleLineWidthChange = (value) => {
        setLineWidth(value);
    }

    return (
        <section className="paint-board wrap-with-border">
            <Settings 
                lineWidth={lineWidth}
                onSetActiveColor={handleActivatedColor}
                onSetLineWidth={handleLineWidthChange}
            />
            {activeColor && (
                <Canvas
                    color={activeColor}
                    lineWidth={lineWidth}
                    height={600}
                    width={980}
                />
            )}
            <WindowResize/>
        </section>
    )
}
