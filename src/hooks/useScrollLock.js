import { useEffect } from "react";

// module-level, shared by every component using the hook
let lockCount = 0;
let savedScrollY = 0;

const lockScroll = () => {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
};

const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);

  if (lockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
    window.scrollTo(0, savedScrollY);
  }
};

/**
 * Locks body scroll while `isLocked` is true.
 * Safe to use from multiple components at once (reference-counted).
 */
const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isLocked]);
};

export default useScrollLock;