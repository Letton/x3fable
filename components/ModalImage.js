import styles from "../styles/ModalImage.module.css";
import Image from "next/image";

export default function ModalImage(props) {
  return (
    <div
      className={
        props.active ? `${styles.modal} ${styles.active}` : styles.modal
      }
      onClick={() => props.setActive(false)}
    >
      <div
        className={`${styles.modal_content} ${styles["unset-img"]}`}
        onClick={() => props.setActive(false)}
      >
        <Image
          {...props}
          className={styles["custom-img"]}
          alt="screenshoot"
          onClick={(e) => e.stopPropagation()}
        ></Image>
      </div>
    </div>
  );
}
