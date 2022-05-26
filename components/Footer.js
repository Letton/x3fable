import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.all_rights}>
        {new Date().getFullYear()} X3Fable Team
      </div>
    </footer>
  );
}
