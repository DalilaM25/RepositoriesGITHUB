import { FC, memo } from "react";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById("modals");

export const Modal: FC<ModalProps> = memo(({ children, onClose }) => {
  return createPortal(
    <>
      <div className={styles.modal}>{children}</div>
      <div className={styles.modalOverlay} onClick={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
});
