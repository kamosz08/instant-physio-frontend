import { RefObject, useEffect } from "react";

export const useCloseDropdownOnClickOutside = (
  ref: RefObject<HTMLDetailsElement>,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        ref.current.open &&
        !ref.current.contains(event.target as Node)
      ) {
        ref.current!.open = false;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
