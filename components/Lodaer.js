import styles from "../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.centered}>
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
