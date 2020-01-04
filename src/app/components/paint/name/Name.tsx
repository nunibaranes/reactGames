import React, { useState } from 'react'

export default function Name() {
    const [name, setName] = useState('')
    const handleOnClick = (e) => {
        const target = e.target as HTMLInputElement;
        target.setSelectionRange(0, target.value.length);
    };

    return (
        <label className="header-name">
        <input
            value={name}
            onChange={e => setName(e.target.value)}
            onClick={e => {handleOnClick(e)}}
            placeholder="Untitled"
        />
        </label>
    )
}