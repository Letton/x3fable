import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link href="/updates">
              <a>Обновления</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>Об игре</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <h1>X3Fable</h1>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/downloads/Game.zip">
              <a>Скачать</a>
            </Link>
          </li>
          <li>
            <Link href="/account">
              <a>
                <span
                  style={{
                    marginRight: "0.5rem",
                  }}
                >
                  Аккаунт
                </span>
                <i className="uil uil-user"></i>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
