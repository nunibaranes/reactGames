import React, { useState, useEffect } from 'react';
import "./ColorPicker.scss";

export default function ColorPicker({ colors = [], activeColor, changeColor }) {
  if (!colors.length) return null
  return (
    <fieldset className="color-picker">
      {colors.map((color, i) => (
        <label key={i}>
          <input
            name="color"
            type="radio"
            value={color}
            checked={activeColor === color}
            onChange={() => changeColor(color)}
          />
          <span style={{ background: color }} />
        </label>
      ))}
    </fieldset>
  )
}
