import React, { useState, useEffect} from 'react';
import Settings from './settings/Settings';
import WindowResize from '../common/window-resize/WindowResize';

import './PaintBoard.scss';

export default function Paint() {
    return (
        <section className="paint-board wrap-with-border">
            <Settings />
            <WindowResize/>
        </section>
    )
}
