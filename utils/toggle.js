"use client";
import { useLocalStorage } from "mas22/useLocalStorage/useLocalStorage";
import { useCallback, useEffect } from "react";

const useToggle = (keyName) => {
  const [isOpen, setIsOpen] = useLocalStorage(keyName, false);


  const toggleOpen = (event) => {
    event && event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", close);
    } else {
      window.removeEventListener("click", close);
    }
  }, [isOpen]);

  const toggleProps = [isOpen, toggleOpen];

  return toggleProps;
};

export default useToggle;
