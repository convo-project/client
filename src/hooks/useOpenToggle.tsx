"use client";

import { useRef, Dispatch, SetStateAction, MutableRefObject, useEffect } from "react";
import { useOnClickOutside, useToggle } from "usehooks-ts";

interface UseOpenToggleReturn {
  isOpen: boolean;
  openToggle: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  ref: MutableRefObject<HTMLDivElement | null>;
}

export default function useOpenToggle(): UseOpenToggleReturn {
  const [isOpen, openToggle, setIsOpen] = useToggle();
  const ref = useRef(null);
  const close = () => isOpen && setIsOpen(false);

  useOnClickOutside(ref, close);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return { isOpen, openToggle, setIsOpen, ref };
}
