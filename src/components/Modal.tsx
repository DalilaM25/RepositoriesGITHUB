import React, { FC, memo } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modals");

export const Modal: FC<ModalProps> = memo(({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>{children}</div>
      <div className={styles.modalOverlay} onClick={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
});
