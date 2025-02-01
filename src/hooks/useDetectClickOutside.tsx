import {useEffect, useRef, useCallback, RefObject} from "react";

type UseDetectClickOutsideProps = {
  onOutsideClick: (event: MouseEvent | TouchEvent) => void;
  isActive: boolean; // Whether the hook should listen for outside clicks
};

const useDetectClickOutside = <T extends HTMLElement>({
  onOutsideClick,
  isActive,
}: UseDetectClickOutsideProps) : RefObject<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    },
    [onOutsideClick],
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isActive, handleClickOutside]);

  return ref;
};

export default useDetectClickOutside;
