import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRef } from "react";

export default function Header() {
  const ulRef = useRef(null);
  const isOpen = useRef(false);

  const menuHandler = () => {
    if (!isOpen.current) {
      ulRef.current.style.left = "0";
      isOpen.current = true;
      console.log(isOpen.current);
    } else {
      ulRef.current.style.left = "-100%";
      isOpen.current = false;
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.menu_button}>
          <i className="uil uil-bars" onClick={menuHandler}></i>
        </div>
        <ul ref={ulRef}>
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
