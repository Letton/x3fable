import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import styles from "../../styles/Account.module.css";
import fetchJson from "../../lib/fetchJSON";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(login);
    console.log(email);
    console.log(password);
    await fetchJson("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        email,
        password,
      }),
    });
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
            <button type="submit" className={styles.submit_button}>
              Зарегистрироваться
            </button>
            <Link href="/account/login">
              <a className={styles.alt_link}>Войти</a>
            </Link>
          </form>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
