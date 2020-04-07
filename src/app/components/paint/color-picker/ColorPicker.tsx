import React from "react";

import {
  StyledColorPicker,
  StyledColorPickerInput,
  StyledColorPickerSpan,
  StyledColorPickerLabel,
} from "./colorPicker.styles";
interface IColorPicker {
  colors: string[];
  activeColor: string;
  changeColor: (color: string) => void;
}
export default function ColorPicker(props: IColorPicker) {
  const { colors = [], activeColor, changeColor } = props;
  if (!colors.length) return null;
  return (
    <StyledColorPicker className="color-picker">
      {colors.map((color, i) => (
        <StyledColorPickerLabel key={i}>
          <StyledColorPickerInput
            name="color"
            type="radio"
            value={color}
            checked={activeColor === color}
            onChange={() => changeColor(color)}
          />
          <StyledColorPickerSpan style={{ background: color }} />
        </StyledColorPickerLabel>
      ))}
    </StyledColorPicker>
  );
}
