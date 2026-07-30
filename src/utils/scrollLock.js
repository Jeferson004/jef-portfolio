let lockCount = 0;

const applyLock = () => {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
};

const removeLock = () => {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
};

export const lockScroll = () => {
  lockCount++;

  if (lockCount === 1) {
    applyLock();
  }
};

export const unlockScroll = () => {
  if (lockCount === 0) return;

  lockCount--;

  if (lockCount === 0) {
    removeLock();
  }
};

export const forceUnlockScroll = () => {
  lockCount = 0;
  removeLock();
};

export const isScrollLocked = () => lockCount > 0;