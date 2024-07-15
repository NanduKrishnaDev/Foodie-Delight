import { useLayoutEffect, useState } from "react";

export const BreakPoints = {
  xxs: 300,
  ip5: 320,
  xsm: 480,
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
  max: Number.MAX_SAFE_INTEGER,
};

export const useResponsive = () => {
  const [size, setSize] = useState(window.innerWidth);

  const updateSize = () => {
    setSize(window.innerWidth);
  };

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    breakPoints: {
      xsm: size <= BreakPoints.xsm,
      xs: size <= BreakPoints.xs,
      sm: size <= BreakPoints.sm,
      md: size <= BreakPoints.md,
      lg: size <= BreakPoints.lg,
      xl: size <= BreakPoints.xl,
      max: size > BreakPoints.xl,
    },
    width: size,
  };
};
