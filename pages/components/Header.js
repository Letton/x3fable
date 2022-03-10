import Link from "next/link";
import styles from "../../styles/Header.module.css";

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav className={styles.navBar}>
          <h1>X3Fable</h1>
          <ul>
            <Link href="/">
              <a>
                <li>Главная</li>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <li>Об Игре</li>
              </a>
            </Link>
            <Link href="/wiki">
              <a>
                <li>Wiki</li>
              </a>
            </Link>
          </ul>
          <Link href="/download">
            <a
              style={{
                fontWeight: "600",
                fontSize: "1.25em",
              }}
            >
              <span
                style={{
                  marginRight: "0.5em",
                }}
              >
                Скачать
              </span>
              <i className="uil uil-import"></i>
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
