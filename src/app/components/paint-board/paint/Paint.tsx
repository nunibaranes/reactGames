import React, { useState, useEffect} from 'react';
import Settings from '../settings/Settings'

export default function Paint() {
    return (
        <section className="paint-board wrap-with-border">
            <Settings />
        </section>
    )
}
