import React, { useState, useEffect } from "react";

import { StyledWindowResize } from "./windowResize.styles";

export default function WindowResize() {
  const [[windowWidth, windowHeight], setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      setVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setVisible(false), 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledWindowResize className="window-size" hidden={!visible}>
      {windowWidth} x {windowHeight}
    </StyledWindowResize>
  );
}
