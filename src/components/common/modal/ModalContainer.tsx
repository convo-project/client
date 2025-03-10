"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import ModalPortal from "./ModalPortal";

type ModalContainerProps = {
  children: React.ReactNode;
  isCloseClickOutside?: boolean;
  onClose: () => void;
  variantClasses: string;
  isAlarmModal?: boolean;
};

export default function ModalContainer(props: ModalContainerProps) {
  const { children, isCloseClickOutside, onClose, variantClasses, isAlarmModal } = props;
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    if (isCloseClickOutside) {
      onClose();
    }
  });

  return (
    <ModalPortal>
      <div
        className={`${isAlarmModal ? "fixed" : "fixed inset-0 bg-black bg-opacity-30"} z-[1200]`}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed inset-0 m-auto flex justify-center ${variantClasses} bg-white rounded-[10px] z-[1200]`}>
        <div
          ref={modalRef}
          onClick={(event) => event.stopPropagation()}
          className="flex flex-col items-center w-full h-full">
          {children}
        </div>
      </motion.div>
    </ModalPortal>
  );
}
