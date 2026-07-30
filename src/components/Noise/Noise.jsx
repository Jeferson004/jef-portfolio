import { useRef, useEffect } from "react";
import s from "./Noise.module.scss";

const Noise = ({
  children,
  patternRefreshInterval = 2,
  patternAlpha = 15,
  grainSize = 2,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId;

    const dpr = window.devicePixelRatio || 1;

    // Offscreen canvas
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    const resize = () => {
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);

      canvas.width = width;
      canvas.height = height;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      // Size of the small texture
      offscreen.width = Math.ceil(width / grainSize);
      offscreen.height = Math.ceil(height / grainSize);
    };

    const drawGrain = () => {
      const imageData = offCtx.createImageData(
        offscreen.width,
        offscreen.height
      );

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = (Math.random() * 255) | 0;

        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      offCtx.putImageData(imageData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        offscreen,
        0,
        0,
        offscreen.width,
        offscreen.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }

      frame++;
      animationId = requestAnimationFrame(loop);
    };

    resize();
    loop();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [patternRefreshInterval, patternAlpha, grainSize]);

  return (
    <>
      <div className={s.mesh_container}>
        <div className={s.mesh}></div>
      </div>

      <div className={s.wrapper}>
        <canvas ref={grainRef} className={s.noiseOverlay} />
        {children}
      </div>
    </>
  );
};

export default Noise;