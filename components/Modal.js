import Link from "next/link";
import styles from "../styles/Modal.module.css";

export default function Modal({ active, setActive, title, text }) {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.close} onClick={() => setActive(false)}>
          <i className="uil uil-multiply"></i>
        </div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
