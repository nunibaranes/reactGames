import React, { useState, useEffect} from 'react';
import randomColor from 'randomcolor';
import Name from '../name/Name';
import ColorPicker from '../color-picker/ColorPicker';
import './Settings.scss';

export default function Settings() {
    const [colors, setColors] = useState([]);
    const [activeColor, setActiveColor] = useState(null);

    useEffect(() => {
        getColors();
    }, []);

    const getColors = () => {
        const baseColor = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
        .then(res => res.json())
        .then(res => {
        setColors(res.colors.map(color => color.hex.value))
        setActiveColor(res.colors[0].hex.value)
        })
    }

    return (
        <section className="settings wrapper" style={{ borderTop: `10px solid ${activeColor}`}}>
            <Name />
            <div className="colors-wrapper" style={{ marginTop: 10 }}>
                <ColorPicker
                    colors={colors}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                />
                <button className="btn change-color" onClick={() => getColors()}>Change Color</button>
            </div>
        </section>
    )
}
