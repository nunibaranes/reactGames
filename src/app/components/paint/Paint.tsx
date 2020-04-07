import React, { useState, useEffect } from "react";
import Settings from "./settings/Settings";
import WindowResize from "../common/window-resize/WindowResize";
// import Canvas from './canvas/Canvas';
import Canvas from "./canvas/Canvas";

import { StyledWrapper } from "../../styles/common/common.styles";

export default function Paint() {
  const [activeColor, setActiveColor] = useState(null);
  const [lineWidth, setLineWidth] = useState(0);

  const handleActivatedColor = (color: string) => {
    setActiveColor(color);
  };

  const handleLineWidthChange = (value: number) => {
    setLineWidth(value);
  };

  return (
    <StyledWrapper className="paint-board" withBorder noPadding>
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
      <WindowResize />
    </StyledWrapper>
  );
}
