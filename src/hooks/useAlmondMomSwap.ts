import { useState } from "react";

export const useAlmondMomSwap = () => {
  const [isSwapped, setIsSwapped] = useState(false);

  const toggleSwap = () => setIsSwapped(!isSwapped);

  return { isSwapped, toggleSwap };
};
