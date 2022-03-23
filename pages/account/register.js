import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import styles from "../../styles/Account.module.css";
import fetchJson from "../../lib/fetchJson";
import Link from "next/link";

import { useState } from "react";

export default function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ title: null, text: null });

  const registerHandler = async (e) => {
    e.preventDefault();
    const response = await fetchJson("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    });
    if (response.status == "ok") {
      setModalActive(true);
      setModalContent({
        title: "Супер!",
        text: "На ваш почтовый адрес было выслано письмо для активации аккаунта",
      });
      return;
    }
    if (response.status == "error") {
      setModalActive(true);
      setModalContent({
        title: "Ошибка",
        text: response.message,
      });
      return;
    }
    setModalActive(true);
    setModalContent({
      title: "Ошибка",
      text: "Неизвестная ошибка",
    });
    return;
  };

  return (
    <Layout>
      <Header />
      <main className={styles.main}>
        <div className={styles.form_wrapper}>
          <form onSubmit={registerHandler}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <input
              type="text"
              className={styles.input}
              id="login"
              onChange={(e) => setLogin(e.target.value)}
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              className={styles.input}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              type="password"
              className={styles.input}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.button}>
              Зарегистрироваться
            </button>
            <Link href="/account/login">
              <a className={styles.alt_link}>Войти</a>
            </Link>
          </form>
        </div>
      </main>
      <Footer />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        title={modalContent.title}
        text={modalContent.text}
      />
    </Layout>
  );
}
