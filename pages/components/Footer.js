import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.all_rights}>
        {new Date().getFullYear()} Все права игнорированы
      </div>
    </footer>
  );
}
