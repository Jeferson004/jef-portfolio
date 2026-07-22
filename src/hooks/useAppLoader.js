import { useEffect, useState } from "react";

export default function useAppLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadApp() {
      // Wait for fonts
      await document.fonts.ready;

      // Wait for every image
      const images = [...document.images];

      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // Wait for next paint so browser can render everything
      await new Promise(requestAnimationFrame);

      if (mounted) {
        setLoading(false);
      }
    }

    loadApp();

    return () => {
      mounted = false;
    };
  }, []);

  return loading;
}