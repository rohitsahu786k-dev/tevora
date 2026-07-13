"use client";

import { useEffect, useState } from "react";

export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    coarsePointer: false,
    limitedHeight: false,
    saveData: false,
  });

  useEffect(() => {
    const update = () =>
      setCapability({
        coarsePointer: window.matchMedia("(pointer: coarse)").matches,
        limitedHeight: window.matchMedia("(max-height: 640px)").matches,
        saveData:
          "connection" in navigator &&
          Boolean(
            (navigator as Navigator & { connection?: { saveData?: boolean } })
              .connection?.saveData,
          ),
      });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return capability;
}
