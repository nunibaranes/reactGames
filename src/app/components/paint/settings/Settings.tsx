import React, { useState, useEffect, useRef, useCallback, memo} from 'react';
import randomColor from 'randomcolor';
import Name from '../name/Name';
import ColorPicker from '../color-picker/ColorPicker';
import './Settings.scss';

const Settings = (props: any) => {
    const lineWidthRef = useRef();

    const [colors, setColors] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [lineWidth, setLineWidth] = useState(props.lineWidth || 5);

    useEffect(() => {
        getColors();
        props.onSetLineWidth(lineWidth);
    }, []);

    const getColors = useCallback(() => {
        const baseColor = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
        .then(res => res.json())
        .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
        props.onSetActiveColor(res.colors[0].hex.value);
        })
    }, [])

    const handleLineWidthChange = (e) => {
        const value = parseInt(e.target.value); 
        setLineWidth(value);
        props.onSetLineWidth(value);
    }

    const handleChangeColor = (color) => {
        setActiveColor(color)
        props.onSetActiveColor(color);
    }

    return (
        <section className="settings wrapper" style={{ borderTop: `10px solid ${activeColor}`}}>
            <Name />
            <div className="colors-wrapper" style={{ marginTop: 10 }}>
                <ColorPicker
                    colors={colors}
                    activeColor={activeColor}
                    changeColor={handleChangeColor}
                />
                <button className="btn change-color" onClick={() => getColors()}>Change Color</button>
            </div>
            <div className="line-width-wrapper">
                <label htmlFor="lineWidth">Line: {lineWidth}</label>
                <input id="lineWidth" ref={lineWidthRef} type="range" onChange={e => handleLineWidthChange(e)} value={lineWidth} />
            </div>
        </section>
    )
}

export default memo(Settings);
